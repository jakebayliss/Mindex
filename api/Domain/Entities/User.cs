namespace Domain.Entities;
public class User
{
	public Guid UserId { get; set; }
	public string Email { get; set; }
	public string DisplayName { get; set; }
	public double Points { get; set; }
	public DateTime CreatedOn { get; set; }
}
