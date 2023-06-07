using Application.Common.Interfaces;
using Domain.Entities;
using System.IO;

namespace Infrastructure.Services
{
	public class PointsService : IPointsService
	{
		public double CalculateTotalPoints(User user, int streak)
		{
			return user.Points + 10 + (streak * 10);
		}

		public double CalculateHabitPoints(Habit habit, int streak)
		{
			return habit.Points + 10 + (streak * 10);
		}

		public int GetStreak(Habit habit, Completion lastCompletion)
		{
			if (lastCompletion != null)
			{
				var carryOnStreak = lastCompletion.CompletedOn > DateTime.Now.AddDays(-1);
				return carryOnStreak ? habit.Streak + 1 : 0;
			}
			return 0;
		}

		public int CalculateLevel(double points)
		{
			var level = (int)Math.Floor(6 * Math.Pow((points / 233), 0.33));
			return Math.Max(level, 1);
		}
	}
}
