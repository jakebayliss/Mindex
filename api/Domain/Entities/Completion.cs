namespace Domain.Entities;

public class Completion
{
	public int Id { get; set; }
	public DateTime CompletedOn { get; set; }
	public int HabitId { get; set; }
	public DateTime CreatedOn { get; set; }
	public Guid UserId { get; set; }
}
