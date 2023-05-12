using Domain.Entities;

namespace Application.Common.Interfaces
{
	public interface IPointsService
	{
		double CalculatePoints(User user, Habit habit, Completion lastCompletion);
		int CalculateLevel(double points);
	}
}
