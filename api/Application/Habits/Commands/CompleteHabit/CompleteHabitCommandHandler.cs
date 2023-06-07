using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Completions.Queries.GetCompletions;
using Application.Habits.Queries.GetUserHabits;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Commands.CompleteHabit
{
	public class CompleteHabitCommand : IRequest<CompletionDto>
	{
		public Guid UserId { get; set; }
		public int HabitId { get; set; }
		public DateTime Date { get; set; }
	}

	public class CompleteHabitCommandHandler : IRequestHandler<CompleteHabitCommand, CompletionDto>
	{
		private readonly IApplicationDbContext _context;
		private readonly IPointsService _pointsService;

		public CompleteHabitCommandHandler(IApplicationDbContext context, IPointsService pointsService)
		{
			_context = context;
			_pointsService = pointsService;
		}

		public async Task<CompletionDto> Handle(CompleteHabitCommand request, CancellationToken cancellationToken)
		{
			var localDate = request.Date.ToLocalTime();
			var habit = await _context.Habits.FirstOrDefaultAsync(x => x.Id == request.HabitId, cancellationToken) 
				?? throw new NotFoundException(nameof(Habit), request.HabitId);
			
			var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == request.UserId, cancellationToken)
				?? throw new NotFoundException(nameof(User), request.UserId);
			
			var lastCompletion = await _context.Completions.Where(x => x.HabitId == request.HabitId && x.CompletedOn < request.Date)
				.OrderByDescending(x => x.CompletedOn)
				.FirstOrDefaultAsync(cancellationToken);

			var streak = _pointsService.GetStreak(habit, lastCompletion);

			habit.Streak = streak;
			habit.Points = _pointsService.CalculateHabitPoints(habit, streak);
			habit.Level = _pointsService.CalculateLevel(habit.Points);
			_context.Habits.Update(habit);
			await _context.SaveChangesAsync(cancellationToken);

			user.Points = _pointsService.CalculateTotalPoints(user, streak);
			_context.Users.Update(user);
			await _context.SaveChangesAsync(cancellationToken);
			
			var completion = new Completion
			{
				HabitId = habit.Id,
				CompletedOn = localDate,
				CreatedOn = DateTime.Now,
				UserId = request.UserId
			};
			await _context.Completions.AddAsync(completion, cancellationToken);
			await _context.SaveChangesAsync(cancellationToken);

			return new CompletionDto
			{
				CompletedOn = localDate,
				ListId = habit.HabitListId,
				Habit = new HabitDto { Id = habit.Id, Points = habit.Points, Level = habit.Level },
				Points = user.Points,
				Level = _pointsService.CalculateLevel(user.Points),
			};
		}
	}
}
