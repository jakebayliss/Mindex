namespace Domain.Entities;

public class HabitList
{
	public int Id { get; set; }
	
	public string? Title { get; set; }
	public Guid UserId { get; set; }
	public DateTime CreatedOn { get; set; }

	public IList<Habit> Habits { get; private set; } = new List<Habit>();
}
