import { useState, useEffect } from 'react';
import { HabitListDto, HabitsClient, NewListCommand } from '../api-client';
import { BASE_API_URL } from '../config';

import Calendar from '@/components/Calendar'
import Header from '@/components/Header';
import { NewHabitCommand } from '../api-client';
import { useMsal } from '@azure/msal-react';

const HomePage = () => {
  const { accounts } = useMsal();
  const user = accounts[0];
  const [habitLists, setHabitLists] = useState<HabitListDto[]>([]);
  const [habitsClient, setHabitsClient] = useState<HabitsClient | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
        var userHabitLists = await habitsClient.getUserHabits(user.localAccountId);
        if(userHabitLists.habitLists){
          setHabitLists(userHabitLists.habitLists);
        }
      }
    })();
  }, [habitsClient])

  const handleDateClick = (clickedDate: Date | null) => {
    if (clickedDate) {
      setSelectedDate(clickedDate);
    }
  }

  const handleNewList = async () => {
    if(habitsClient && user) {
      var newList = await habitsClient.createHabitList(user.localAccountId, new NewListCommand({userId: user.localAccountId, title: newListText}))
      setHabitLists([...habitLists, newList]);
    }
    setNewListText('');
    setAddingNewList(false);
  }

  const handleNewHabit = async (listId: number | undefined) => {
    var listIndex = habitLists.indexOf(habitLists.find((list) => list.id === listId) as HabitListDto);
    if(habitsClient && user) {
      var updatedHabitList = await habitsClient.createHabit(user.localAccountId, new NewHabitCommand({listId: listId, title: newHabitText }));
      setHabitLists(prevItems => {
        const newItems = [...prevItems];
        newItems[listIndex] = { ...updatedHabitList }  as HabitListDto;
        return newItems;
      });
    }
    setNewHabitText('');
  }

  return (
    <>
        <Header />
        <main className="flex min-h-screen flex-row justify-center gap-10 p-24">
          <div className="max-w-5xl items-center justify-center font-mono text-sm">
            <Calendar onDateClick={(clickedDate) => handleDateClick(clickedDate)} />
            <h4 className='text-center py-2'>{selectedDate?.toDateString()}</h4>
          </div>
          <div>
            {habitLists && habitLists.length > 0 && (
              habitLists.map((list) => 
                <div>
                  <h2>{list.title}</h2>
                  <ul>
                    {list.habits && list.habits.length > 0 && (
                      list.habits.map((habit, i) =>
                        <li key={i}>{habit.title}</li>
                    ))}
                  </ul>
                  <div className='flex'>
                    <input type="text" value={newHabitText} onChange={(e) => setNewHabitText(e.target.value)}/>
                    <button onClick={() => handleNewHabit(list.id)}>Add</button>
                </div>
                </div>
              )
            )}
            {!addingNewList && (
              <button className='bg-teal-600 px-4 py-1 rounded-sm hover:shadow-inner hover:bg-teal-700' 
                onClick={() => setAddingNewList(!addingNewList)}>New List</button>
            )}
            {addingNewList && (
                <div className='flex'>
                  <input type="text" value={newListText} onChange={(e) => setNewListText(e.target.value)}/>
                  <button className='bg-teal-600 px-4 py-1 rounded-sm hover:shadow-inner hover:bg-teal-700' 
                    onClick={() => handleNewList()}>Add</button>
                  <button className='bg-amber-600 px-4 py-1 rounded-sm hover:shadow-inner hover:bg-amber-700' 
                    onClick={() => setAddingNewList(false)}>x</button>
                </div>
              )}
          </div>
        </main>
    </>
  )
}

export default HomePage;