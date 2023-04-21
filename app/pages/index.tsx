import Calendar from '@/components/Calendar'
import { useState } from 'react';

const Home = () => {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (clickedDate: Date | null) => {
    if (clickedDate) {
      setSelectedDate(clickedDate);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-5xl items-center justify-center font-mono text-sm">
        
        <Calendar onDateClick={(clickedDate) => handleDateClick(clickedDate)} />
        <h4 className='text-center py-2'>{selectedDate?.toDateString()}</h4>
      </div>
    </main>
  )
}

export default Home;