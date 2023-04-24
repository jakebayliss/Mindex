import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../auth/UserContext';
import { HabitsClient } from '../api-client';
import Calendar from '@/components/Calendar'
import Header from '@/components/Header';

const HomePage = () => {
  const userContext = useContext(UserContext);
  const habitsClient = new HabitsClient();
  const [habits, setHabits] = useState([]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    (async () => {
      if (userContext.user) {
        var habits = await habitsClient.getUserHabits(userContext.user?.localAccountId);
      }
    })();
  })

  const handleDateClick = (clickedDate: Date | null) => {
    if (clickedDate) {
      setSelectedDate(clickedDate);
    }
  }

  const handleNewHabit = async () => {
    await habitsClient.getUserHabits(userContext.user?.localAccountId)
    setNewHabit('');
    setAddingNew(false);
    
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
            <button onClick={() => setAddingNew(!addingNew)}>Add new</button>
            {addingNew && (
              <div>
                  <input type="text" value={newHabit} onChange={(e) => setNewHabit(e.target.value)}/>
                  <button onClick={() => handleNewHabit()}>Add</button>
              </div>
            )}
          </div>
        </main>
    </>
  )
}

export default HomePage;