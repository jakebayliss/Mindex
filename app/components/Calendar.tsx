import { CompletionDto, HabitListDto } from '@/api-client';
import React, { useState } from 'react';

interface CalendarProps {
    onDateClick: (date: Date) => void;
    habits: HabitListDto[];
    completions: CompletionDto[];
    startDate: Date | undefined;
}

function Calendar({ onDateClick, habits, completions, startDate }: CalendarProps) {

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [monthIndex, setMonthIndex] = useState(0);
  const colourGradient = ["bg-teal-800", "bg-teal-600", "bg-teal-500", "bg-teal-300"];

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

  const getColour = (completedCount: number | null) => {
    if(completedCount){
      return `${colourGradient[completedCount]} text-white`;
    }
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
          const totalCount = habits.filter((x: HabitListDto) => x.createdOn && date && x.createdOn?.toISOString() <= date?.toISOString()).length;
          const completedCount = completions.filter(c => c.completedOn?.toDateString() === date?.toDateString()).length;
          return (
            <div key={index} onClick={() => handleDateClick(date)}
                className={`p-2 text-center cursor-pointer ${getColour(completedCount)} ${isCurrentDate ? 'bg-slate-700 text-white' : (selected ? 'bg-slate-500 text-white' : '' )} ${date && !isCurrentDate && !selected ? 'bg-gray-100 hover:text-white hover:bg-slate-500' : ''}`}>
              {date ? date.getDate() : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;