import { useState, useEffect, useRef } from 'react';
import { CompleteHabitCommand, CompletionDto, HabitListDto, HabitsClient, NewListCommand, NewHabitCommand, UsersClient, CreateUserCommand, UserDto, HabitDto } from '../api-client';
import { useMsal } from '@azure/msal-react';
import { BASE_API_URL } from '../config';

import Calendar from '@/components/Calendar'
import LineChartComponent from '@/components/Chart';
import { Triangle } from  'react-loader-spinner'

const Dashboard = () => {
  const { accounts } = useMsal();
  const b2cUser = accounts[0];
  const [habitsClient, setHabitsClient] = useState<HabitsClient | undefined>(undefined);
  const [usersClient, setUsersClient] = useState<UsersClient | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  
  const [user, setUser] = useState<UserDto>();
  const [points, setPoints] = useState<number | undefined>(0);
  const [level, setLevel] = useState<number | undefined>(0);
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
      setLoading(true);
      setHabitsClient(new HabitsClient(BASE_API_URL));
      setUsersClient(new UsersClient(BASE_API_URL));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (habitsClient && b2cUser) {
        const user = await usersClient?.getUser(b2cUser.localAccountId);
        if(!user){
          const newUser = await usersClient?.createUser(new CreateUserCommand({userId: b2cUser.localAccountId, displayName: b2cUser.name}));
          setUser(newUser);
        }
        else {
          setUser(user);
          setPoints(user.points);
          setLevel(user.level);
        }
        console.log(user);
        const userHabitLists = await habitsClient.getUserHabits(b2cUser.localAccountId);
        if(userHabitLists.habitLists){
          setHabitLists(userHabitLists.habitLists);
        }
        const completions = await habitsClient.getCompletions(b2cUser.localAccountId, 30);
        if(completions){
          setCompletions(completions);
        }
        setLoading(false);
      }
    })();
  }, [habitsClient])

  const handleNewList = async () => {
    if(habitsClient && b2cUser) {
      const newList = await habitsClient.createHabitList(b2cUser.localAccountId, new NewListCommand({userId: b2cUser.localAccountId, title: newListText}))
      setHabitLists([...habitLists, newList]);
    }
    setNewListText('');
    setAddingNewList(false);
  }

  const handleNewHabit = async () => {
    const listIndex = habitLists.indexOf(habitLists.find((list) => list.id === editingListId) as HabitListDto);
    if(habitsClient && b2cUser) {
      const updatedHabitList = await habitsClient.createHabit(b2cUser.localAccountId, new NewHabitCommand({listId: editingListId, title: newHabitText }));
      setHabitLists(prevItems => {
        const newItems = [...prevItems];
        newItems[listIndex] = { ...updatedHabitList }  as HabitListDto;
        return newItems;
      });
    }
    modal.current?.close();
    setNewHabitText('');
  }

  const handleHabitCompletion = async (habitId: number | undefined) => {
    const completed = isHabitCompleted(habitId);
    if(completed) {
      return;
    }

    if(!(selectedDate.toLocaleDateString() == new Date(Date.now()).toLocaleDateString())) {
      console.log('selectedDate', selectedDate.toLocaleDateString());
      console.log('today', new Date(Date.now()).toLocaleDateString());
      return;
    }

    if(habitsClient && b2cUser) {
        const completion = await habitsClient.completeHabit(b2cUser.localAccountId, new CompleteHabitCommand({habitId, date: new Date(selectedDate.toISOString())}));
        setCompletions([...completions, completion]);
        setPoints(completion.points);
        setLevel(completion.level);

        const list = habitLists.find(x => x.id == completion.listId);
        const listIndex = habitLists.indexOf(list as HabitListDto);
        const habits = list?.habits;
        if(habits) {
          const habitIndex = habits?.indexOf(habits.find(x => x.id == completion?.habit?.id) as HabitDto);
          habits[habitIndex as number] = completion.habit as HabitDto;
          list.habits = habits;
          setHabitLists(prevItems => {
            const newItems = [...prevItems];
            newItems[listIndex] = { ...list }  as HabitListDto;
            return newItems;
          });
        }
    }
  }

  const isHabitCompleted = (habitId: number | undefined) => {
    return completions.filter(x => x.completedOn?.toLocaleDateString() == selectedDate.toLocaleDateString()).map(x => x.habit?.id).includes(habitId);
  }

  const openAddHabitModal = (listId: number | undefined) => {
    modal.current?.showModal();
    setEditingListId(listId);
  }

  return loading ? 
    <main className='flex flex-col justify-center items-center' style={{minHeight: 'calc(100vh - 56px)'}}>
      <p>Getting your profile ready</p>
      <Triangle
        height="60"
        width="80"
        color="#5a9188"
        wrapperStyle={{}}
        visible={true} />
    </main> : (
    <main className="flex flex-col md:px-10" style={{minHeight: 'calc(100vh - 56px)'}}>
      <div className='p-5 text-right'>
        <p>Lvl {level}: {points} points</p>
      </div>
      <div className='flex flex-wrap flex-row justify-center gap-10'>
        <div className="max-w-5xl items-center justify-center font-mono text-sm h-1/3">
          <Calendar onDateClick={(clickedDate) => setSelectedDate(clickedDate)} startDate={user?.createdOn} habits={habitLists} completions={completions}/>
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
        {habitLists && habitLists.length > 0 && (
          habitLists.map((list) => (
            <div key={list.id} className='min-w-[200px]'>
              <div className='flex justify-between mb-2'>
                <p><b>{list.title}</b></p>
                <button onClick={() => openAddHabitModal(list.id)}>➕</button>
              </div>
              <ul>
                {list.habits && list.habits.length > 0 && (
                  list.habits.map((habit, i) => (
                    <li key={i} className="flex justify-between">
                      <div>
                        <span className='inline-block mr-1'>[Lvl {habit.level}]</span>
                        <span>
                          {habit.title}
                        </span>
                      </div>
                      <button onClick={() => handleHabitCompletion(habit.id)}>{isHabitCompleted(habit.id) ? '☑️' : '🔲'}</button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default Dashboard;