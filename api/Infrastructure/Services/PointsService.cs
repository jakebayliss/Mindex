using Application.Common.Interfaces;
using Domain.Entities;

namespace Infrastructure.Services
{
	public class PointsService : IPointsService
	{
		public double CalculatePoints(User user, Habit habit, Completion lastCompletion)
		{
			var k = 0.1;
			var carryOnStreak = lastCompletion.CompletedOn > DateTime.Now.AddDays(-1);
			var streak = carryOnStreak ? habit.Streak + 1 : 0;
			
			if(streak == 30)
			{
				streak *= 3;
			}
			else if(streak == 7)
			{
				streak *= 2;
			}
			
			var newPoints = (user.Points + 30) / (1 + k * Math.Log(streak));

			return user.Points + newPoints;
		}

		public int CalculateLevel(double points)
		{
			return (int)Math.Floor(13 * Math.Pow((points / 133), 0.33) + 1);
		}
	}
}
