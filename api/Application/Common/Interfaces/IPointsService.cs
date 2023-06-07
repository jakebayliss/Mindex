using Domain.Entities;

namespace Application.Common.Interfaces
{
	public interface IPointsService
	{
		double CalculateTotalPoints(User user, int streak);
		double CalculateHabitPoints(Habit habit, int streak);
		int CalculateLevel(double points);
		int GetStreak(Habit habit, Completion lastCompletion);
	}
}
