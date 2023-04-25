import { useState, useEffect } from 'react';
import { HabitListDto, HabitsClient, NewListCommand } from '../api-client';
import { BASE_API_URL } from '../config';

import Calendar from '@/components/Calendar'
import Header from '@/components/Header';
import { NewHabitCommand } from '../api-client';
import { useMsal } from '@azure/msal-react';
import LineChartComponent from '@/components/Chart';

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
        <main className="flex flex-wrap flex-row justify-center gap-10 p-10" style={{minHeight: 'calc(100vh - 56px)'}}>
          <div className="max-w-5xl items-center justify-center font-mono text-sm w-1/3 h-1/3">
            <Calendar onDateClick={(clickedDate) => handleDateClick(clickedDate)} />
            <h4 className='text-center py-2'>{selectedDate?.toDateString()}</h4>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 w-1/3 h-1/3">
            {habitLists && habitLists.length > 0 ? (
              habitLists.map((list) => (
                <div key={list.id} className="mb-4">
                  <ul className="list-disc pl-4">
                    {list.habits && list.habits.length > 0 && (
                      list.habits.map((habit, i) => (
                        <li key={i} className="mb-1">{habit.title}</li>
                      ))
                    )}
                  </ul>
                  <div className="flex items-center mt-2">
                    <input
                      type="text"
                      value={newHabitText}
                      onChange={(e) => setNewHabitText(e.target.value)}
                      placeholder="Add new habit"
                      className="bg-gray-100 rounded-md py-1 px-2 mr-2 w-full"
                    />
                    <button
                      onClick={() => handleNewHabit(list.id)}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-md py-1 px-4"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No habits found.</p>
            )}
          </div>
          <LineChartComponent />
        </main>
    </>
  )
}

export default HomePage;