namespace Domain.Entities;

public class Habit
{
	public int Id { get; set; }

	public string? Title { get; set; }

	public string? Note { get; set; }

	public DateTime? Reminder { get; set; }
	public DateTime CreatedOn { get; set; }
	public int Streak { get; set; }


	public int HabitListId { get; set; }
}
