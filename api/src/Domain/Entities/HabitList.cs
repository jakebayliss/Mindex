namespace Domain.Entities;

public class HabitList
{
	public int Id { get; set; }
	
	public string? Title { get; set; }

	public IList<Habit> Habits { get; private set; } = new List<Habit>();
}
