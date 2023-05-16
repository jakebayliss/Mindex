using Application.Common.Interfaces;
using Domain.Entities;

namespace Infrastructure.Services
{
	public class PointsService : IPointsService
	{
		public double CalculatePoints(User user, Habit habit, Completion? lastCompletion)
		{
			var streak = 0;
			if(lastCompletion != null)
			{
				var carryOnStreak = lastCompletion.CompletedOn > DateTime.Now.AddDays(-1);
				streak = carryOnStreak ? habit.Streak + 1 : 0;
			}

			return user.Points + (streak * 10);
		}

		public int CalculateLevel(double points)
		{
			var level = (int)Math.Floor(6 * Math.Pow((points / 233), 0.33));
			return Math.Max(level, 1);
		}
	}
}
