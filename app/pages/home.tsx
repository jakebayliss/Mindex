import { useState, useEffect } from 'react';
import { CompleteHabitCommand, CompletionDto, HabitListDto, HabitsClient, NewListCommand, NewHabitCommand } from '../api-client';
import { useMsal } from '@azure/msal-react';
import { BASE_API_URL } from '../config';

import Link from 'next/link';
import Calendar from '@/components/Calendar'
import LineChartComponent from '@/components/Chart';

const HomePage = () => {
  const { accounts } = useMsal();
  const user = accounts[0];
  const [habitsClient, setHabitsClient] = useState<HabitsClient | undefined>(undefined);
  
  const [habitLists, setHabitLists] = useState<HabitListDto[]>([]);
  const [completions, setCompletions] = useState<CompletionDto[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));
  const [newListText, setNewListText] = useState('');
  const [addingNewList, setAddingNewList] = useState(false);
  const [newHabitText, setNewHabitText] = useState('');

  useEffect(() => {
    (async () => {
      setHabitsClient(new HabitsClient(BASE_API_URL));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (habitsClient && user) {
        const userHabitLists = await habitsClient.getUserHabits(user.localAccountId);
        if(userHabitLists.habitLists){
          setHabitLists(userHabitLists.habitLists);
        }
        const completions = await habitsClient.getCompletions(user.localAccountId, 30);
        if(completions){
          setCompletions(completions);
        }
      }
    })();
  }, [habitsClient])

  const handleDateClick = (clickedDate: Date | null) => {
    if (clickedDate) {
      setSelectedDate(clickedDate);
      if(habitLists && habitLists[0] && habitLists[0].habits){
        var filteredHabits = habitLists[0].habits.filter(x => x.createdOn && x.createdOn >= clickedDate);
      }
    }
  }

  const handleNewList = async () => {
    if(habitsClient && user) {
      const newList = await habitsClient.createHabitList(user.localAccountId, new NewListCommand({userId: user.localAccountId, title: newListText}))
      setHabitLists([...habitLists, newList]);
    }
    setNewListText('');
    setAddingNewList(false);
  }

  const handleNewHabit = async (listId: number | undefined) => {
    const listIndex = habitLists.indexOf(habitLists.find((list) => list.id === listId) as HabitListDto);
    if(habitsClient && user) {
      const updatedHabitList = await habitsClient.createHabit(user.localAccountId, new NewHabitCommand({listId: listId, title: newHabitText }));
      setHabitLists(prevItems => {
        const newItems = [...prevItems];
        newItems[listIndex] = { ...updatedHabitList }  as HabitListDto;
        return newItems;
      });
    }
    setNewHabitText('');
  }

  const handleHabitCompletion = async (date: Date, habitId: number | undefined) => {
    const completed = isHabitCompleted(date, habitId);
    if(completed) {
      return;
    }

    if(habitsClient && user) {
        const completion = await habitsClient.completeHabit(user.localAccountId, new CompleteHabitCommand({habitId, date: new Date(date)}));
        setCompletions([...completions, completion]);
    }
  }

  const isHabitCompleted = (date: Date, habitId: number | undefined) => {
    return completions.filter(x => x.completedOn?.toDateString() == date.toDateString()).map(x => x.habitId).includes(habitId);
  }

  return (
    <main className="flex flex-wrap flex-row justify-center gap-10 p-10" style={{minHeight: 'calc(100vh - 56px)'}}>
      <div className="max-w-5xl items-center justify-center font-mono text-sm w-1/3 h-1/3">
        <Calendar onDateClick={(clickedDate) => handleDateClick(clickedDate)} />
        <h4 className='text-center py-2'>{selectedDate?.toDateString()}</h4>
      </div>
      <div className="flex gap-10 w-1/2 h-1/3">
        {habitLists && habitLists.length > 0 ? (
          habitLists.map((list) => (
            <div key={list.id} className='w-full'>
              <div className='flex justify-between mb-2'>
                <p><b>{list.title}</b></p>
                <Link href="/habits/new">➕</Link>
              </div>
              <ul>
                {list.habits && list.habits.length > 0 && (
                  list.habits.map((habit, i) => (
                    <li key={i} className="flex justify-between">
                      <span>
                        {habit.title}
                      </span>
                      <button onClick={() => handleHabitCompletion(selectedDate, habit.id)}>{isHabitCompleted(selectedDate, habit.id) ? '☑️' : '🔲'}</button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))
        ) : (
          <p>No habits found.</p>
        )}
      </div>
      <LineChartComponent completionData={completions} />
    </main>
  )
}

export default HomePage;