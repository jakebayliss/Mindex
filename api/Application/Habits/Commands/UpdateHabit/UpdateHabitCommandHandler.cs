using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Habits.Queries.GetUserHabits;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Commands.UpdateHabit
{
	public class UpdateHabitCommand : IRequest<HabitDto>
	{
		public Habit Habit { get; set; }
	}

	public class UpdateHabitCommandHandler : IRequestHandler<UpdateHabitCommand, HabitDto>
	{
		private readonly IApplicationDbContext _context;

		public UpdateHabitCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<HabitDto> Handle(UpdateHabitCommand request, CancellationToken cancellationToken)
		{
			var habit = await _context.Habits.FirstOrDefaultAsync(x => x.Id == request.Habit.Id, cancellationToken);

			if (habit == null)
			{
				throw new NotFoundException(nameof(Habit), request.Habit.Id);
			}

			habit.Title = request.Habit.Title;
			habit.Note = request.Habit.Note;
			habit.Reminder = request.Habit.Reminder;

			_context.Habits.Update(habit);
			await _context.SaveChangesAsync(cancellationToken);
			return new HabitDto
			{
				ListId = habit.HabitListId,
				Title = habit.Title,
				Note = habit.Note
			};
		}
	}
}
