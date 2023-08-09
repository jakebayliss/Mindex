using Application.Common.Interfaces;
using Application.Habits.Queries.GetUserHabits;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Infrastructure.Services
{
	public class HabitService : IHabitService
	{
		private readonly IApplicationDbContext _context;
		private readonly IPointsService _pointsService;

		public HabitService(IApplicationDbContext context, IPointsService pointsService)
		{
			_context = context;
			_pointsService = pointsService;
		}

		public async Task<UserHabitsDto> GetUserHabits(Guid userId)
		{
			var userHabitsLists = _context.HabitLists.Where(x => x.UserId == userId).Include(x => x.Habits).ToList();
			var user = _context.Users.Where(x => x.UserId == userId).FirstOrDefault();
			var points = user?.Points;
			var level = _pointsService.CalculateLevel(points ?? 0);
			return new UserHabitsDto
			{
				HabitLists = userHabitsLists.Select(x => new HabitListDto
				{
					Id = x.Id,
					Title = x.Title,
					Habits = x.Habits.Select(y => new HabitDto
					{
						Id = y.Id,
						Title = y.Title,
						Note = y.Note,
						Reminder = y.Reminder,
						ListId = x.Id,
						Points = y.Points,
						Level = _pointsService.CalculateLevel(y.Points)
					}).OrderBy(x => x.CreatedOn).ToList(),
					Points = points ?? 0,
					Level = level
				})
			};
		}
	}
}
