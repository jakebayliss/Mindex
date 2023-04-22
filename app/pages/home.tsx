import Calendar from '@/components/Calendar'
import { useState } from 'react';
import Header from '@/components/Header';

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newHabit, setNewHabit] = useState('');

  const handleDateClick = (clickedDate: Date | null) => {
    if (clickedDate) {
      setSelectedDate(clickedDate);
    }
  }

  const handleAddClick = () => {
    setAddingNew(!addingNew);
  }

  return (
    <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="max-w-5xl items-center justify-center font-mono text-sm">
            <Calendar onDateClick={(clickedDate) => handleDateClick(clickedDate)} />
            <h4 className='text-center py-2'>{selectedDate?.toDateString()}</h4>
          </div>
          <div>
            <button onClick={() => handleAddClick()}>Add new</button>
            <div>
                <input type="text" value={newHabit} onChange={(e) => setNewHabit(e.target.value)}/>
            </div>
          </div>
        </main>
    </>
  )
}

export default HomePage;