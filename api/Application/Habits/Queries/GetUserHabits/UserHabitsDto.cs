using Domain.Entities;
using DPMSeedling.Application.Common.Mappings;

namespace Application.Habits.Queries.GetUserHabits;

public class UserHabitsDto
{
	public IEnumerable<HabitListDto> HabitLists { get; set; }
}

public class HabitListDto : IMapFrom<HabitList>
{
	public int Id { get; set; }
	public string Title { get; set; }
	public DateTime CreatedOn { get; set; }
	public List<HabitDto> Habits { get; set; }
	public double Points { get; set; }
	public int Level { get; set; }
}

public class HabitDto : IMapFrom<Habit>
{
	public int Id { get; set; }
	public string? Title { get; set; }
	public string? Note { get; set; }
	public DateTime CreatedOn { get; set; }
	public DateTime? Reminder { get; set; }
	public int ListId { get; set; }
}
	
