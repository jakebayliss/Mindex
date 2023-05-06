import { useState, useEffect, useRef } from 'react';
import { CompleteHabitCommand, CompletionDto, HabitListDto, HabitsClient, NewListCommand, NewHabitCommand } from '../api-client';
import { useMsal } from '@azure/msal-react';
import { BASE_API_URL } from '../config';

import Link from 'next/link';
import Calendar from '@/components/Calendar'
import LineChartComponent from '@/components/Chart';

const Dashboard = () => {
  const { accounts } = useMsal();
  const user = accounts[0];
  const [habitsClient, setHabitsClient] = useState<HabitsClient | undefined>(undefined);
  
  const [habitLists, setHabitLists] = useState<HabitListDto[]>([]);
  const [completions, setCompletions] = useState<CompletionDto[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()));
  const [newListText, setNewListText] = useState('');
  const [addingNewList, setAddingNewList] = useState(false);
  const [newHabitText, setNewHabitText] = useState('');
  const [editingListId, setEditingListId] = useState<number | undefined>(undefined);
  const modal = useRef<HTMLDialogElement>(null);

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

  const handleNewHabit = async () => {
    const listIndex = habitLists.indexOf(habitLists.find((list) => list.id === editingListId) as HabitListDto);
    if(habitsClient && user) {
      const updatedHabitList = await habitsClient.createHabit(user.localAccountId, new NewHabitCommand({listId: editingListId, title: newHabitText }));
      setHabitLists(prevItems => {
        const newItems = [...prevItems];
        newItems[listIndex] = { ...updatedHabitList }  as HabitListDto;
        return newItems;
      });
    }
    modal.current?.close();
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

  const openAddHabitModal = (listId: number | undefined) => {
    modal.current?.showModal();
    setEditingListId(listId);
  }

  return (
    <main className="flex flex-wrap flex-row justify-center gap-10 p-10" style={{minHeight: 'calc(100vh - 56px)'}}>
      <div className="max-w-5xl items-center justify-center font-mono text-sm w-1/3 h-1/3">
        <Calendar onDateClick={(clickedDate) => handleDateClick(clickedDate)} habits={habitLists} completions={completions}/>
        <h4 className='text-center py-2'>{selectedDate?.toDateString()}</h4>
      </div>
      <dialog ref={modal}>
        <div className='flex flex-col gap-2'>
            <h4>Add a new habit</h4>
            <input type='text' value={newHabitText} onChange={(e) => setNewHabitText(e.target.value)} />
            <div className='flex justify-between'>
                <button onClick={() => handleNewHabit()} className='bg-teal-600 px-4 py-1 rounded-sm hover:shadow-inner hover:shadow-teal-700 text-white'>Add</button>
                <button onClick={() => modal.current?.close()}>❌</button>
            </div>
        </div>
      </dialog>
      <div className="flex gap-10 w-1/2 h-1/3">
        {habitLists && habitLists.length > 0 ? (
          habitLists.map((list) => (
            <div key={list.id} className='w-full'>
              <div className='flex justify-between mb-2'>
                <p><b>{list.title}</b></p>
                <button onClick={() => openAddHabitModal(list.id)}>➕</button>
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

export default Dashboard;