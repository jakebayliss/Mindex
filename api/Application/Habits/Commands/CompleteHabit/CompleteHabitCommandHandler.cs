using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Completions.Queries.GetCompletions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Commands.CompleteHabit
{
	public class CompleteHabitCommand : IRequest<CompletionDto>
	{
		public int HabitId { get; set; }
		public DateTime Date { get; set; }
	}

	public class CompleteHabitCommandHandler : IRequestHandler<CompleteHabitCommand, CompletionDto>
	{
		private readonly IApplicationDbContext _context;

		public CompleteHabitCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<CompletionDto> Handle(CompleteHabitCommand request, CancellationToken cancellationToken)
		{
			var habit = await _context.Habits.FirstOrDefaultAsync(x => x.Id == request.HabitId, cancellationToken);

			if (habit == null)
			{
				throw new NotFoundException(nameof(Habit), request.HabitId);
			}

			var completion = new Completion
			{
				HabitId = habit.Id,
				CompletedOn = request.Date,
				CreatedOn = DateTime.Now
			};
			await _context.Completions.AddAsync(completion, cancellationToken);
			await _context.SaveChangesAsync(cancellationToken);
			return new CompletionDto
			{
				CompletedOn = completion.CompletedOn,
				HabitId = completion.HabitId,
			};
		}
	}
}
