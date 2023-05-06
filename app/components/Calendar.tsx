import { CompletionDto, HabitListDto } from '@/api-client';
import React, { useState } from 'react';

interface CalendarProps {
    onDateClick: (date: Date) => void;
    habits: HabitListDto[];
    completions: CompletionDto[];
}

function Calendar({ onDateClick, habits, completions }: CalendarProps) {

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [monthIndex, setMonthIndex] = useState(0);

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    setMonthIndex(monthIndex - 1);
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    setMonthIndex(monthIndex + 1);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month: number) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(2000, month));
  };

  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const monthName = getMonthName(date.getMonth());

  // Create an array of date objects for the current month
  const dates = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(new Date(date.getFullYear(), date.getMonth(), i));
  }

  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    dates.unshift(null);
  }

  // Add empty cells for days after the last of the month
  while (dates.length % 7 !== 0) {
    dates.push(null);
  }

  const resetToCurrentDate = () => {
    setDate(new Date());
    setMonthIndex(0);
  }

  const handleDateClick = (clickedDate: Date | null) => {
    if (clickedDate) {
      onDateClick(clickedDate);
      if(clickedDate.toDateString() == selectedDate?.toDateString()){
        setSelectedDate(null);
      }
      setSelectedDate(clickedDate);
    }
  };

  const getColour = (date: Date | null) => {
    if(!date){
      return null;
    }
    
    const totalCount = habits.filter((x: HabitListDto) => x.createdOn && x.createdOn?.toISOString() <= date?.toISOString()).length;
    const completedCount = completions.filter(c => c.completedOn?.toDateString() === date?.toDateString()).length;
    var percentage = completedCount / totalCount;
    if (percentage < 0.20)
      return 'bg-red-600';
    else if (percentage < 0.40)
      return 'bg-amber-600';
    else if (percentage < 0.60)
       return 'bg-yellow-600';
    else if (percentage < 0.80)
      return 'bg-teal-600';
    else return 'bg-green-600';
  }

  return (
    <div className="rounded-lg shadow-lg">
        <div className="flex justify-between items-center py-2 px-4">
            <button className="text-gray-600 hover:text-gray-800" onClick={() => prevMonth()}>Prev</button>
            <h1 className="text-lg font-bold text-gray-800">{monthName} {date.getFullYear()}</h1>
            <button className="text-gray-600 hover:text-gray-800" onClick={() => nextMonth()}>Next</button>
        </div>
        <div className="flex justify-center items-center h-5">
            {(monthIndex > 3 || monthIndex < -3) && (
                <button className="text-gray-600 hover:text-gray-800" onClick={resetToCurrentDate}>Go to today</button>
            )}
        </div>
      <div className="weekdays grid grid-cols-7 text-sm font-bold text-gray-600 uppercase tracking-wider">
        <div className="p-2 text-center">Sun</div>
        <div className="p-2 text-center">Mon</div>
        <div className="p-2 text-center">Tue</div>
        <div className="p-2 text-center">Wed</div>
        <div className="p-2 text-center">Thu</div>
        <div className="p-2 text-center">Fri</div>
        <div className="p-2 text-center">Sat</div>
      </div>
      <div className="days grid grid-cols-7 gap-1">
        {dates.map((date: Date | null, index) => {
          const isCurrentDate = date && date.toDateString() === new Date().toDateString();
          const selected = date && selectedDate && date.toDateString() === selectedDate.toDateString();
          return (
            <div 
                key={index} onClick={() => handleDateClick(date)}
                className={`p-2 text-center cursor-pointer ${isCurrentDate ? 'bg-teal-700 text-white' : (selected ? 'bg-teal-500 text-white' : '' )} ${date && !isCurrentDate && !selected ? 'bg-gray-100 hover:bg-teal-300' : ''}`}>
              {date ? date.getDate() : ''}
              <div className={`rounded-full ${getColour(date)}`} style={{width: '5px', height: '5px'}}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;