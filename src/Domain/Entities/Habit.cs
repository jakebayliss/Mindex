namespace Domain.Entities;

public class Habit
{
	public int Id { get; set; }

	public string? Title { get; set; }

	public string? Note { get; set; }

	public DateTime? Reminder { get; set; }


	public HabitList HabitList { get; set; } = null!;
}
