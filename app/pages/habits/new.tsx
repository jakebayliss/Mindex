import { useState, useEffect } from 'react';
import { HabitsClient, NewHabitCommand } from '../../api-client';
import { BASE_API_URL } from '../../config';

interface NewHabitProps {
  listId: number;
  userId: string;
}

const New = ({listId, userId}: NewHabitProps) => {
  const [habitsClient, setHabitsClient] = useState<HabitsClient | undefined>(undefined);
  const [newHabitText, setNewHabitText] = useState('');

  useEffect(() => {
    (async () => {
      setHabitsClient(new HabitsClient(BASE_API_URL));
    })();
  }, []);

  const handleNewHabit = async () => {
    if(habitsClient) {
      await habitsClient.createHabit(userId, new NewHabitCommand({listId: listId, title: newHabitText }));
    }
  }

  return (
    <div className="flex flex-col justify-center" style={{minHeight: 'calc(100vh - 56px)'}}>
      <input type='text' value={newHabitText} onChange={(e) => setNewHabitText(e.target.value)} />
      <button onClick={() => handleNewHabit()}>Add Habit</button>
    </div>
  )
}

export default New;