using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Commands.DeleteHabit
{
	public class DeleteHabitCommand : IRequest<Habit>
	{
		public int HabitId { get; set; }
	}

	public class DeleteHabitCommandHandler : IRequestHandler<DeleteHabitCommand, Habit>
	{
		private readonly IApplicationDbContext _context;

		public DeleteHabitCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<Habit> Handle(DeleteHabitCommand request, CancellationToken cancellationToken)
		{
			var habit = await _context.Habits.FirstOrDefaultAsync(x => x.Id == request.HabitId, cancellationToken);

			if (habit == null)
			{
				throw new NotFoundException(nameof(Habit), request.HabitId);
			}

			_context.Habits.Remove(habit);
			await _context.SaveChangesAsync(cancellationToken);
			return habit;
		}
	}
}
