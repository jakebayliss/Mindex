using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Habits.Commands.NewHabit
{
	public class NewHabitCommand : IRequest<Habit>
	{
		public int ListId { get; set; }
		public string Title { get; set; }
		public string Note { get; set; }
	}

	public class NewHabitCommandHandler : IRequestHandler<NewHabitCommand, Habit>
	{
		private readonly IApplicationDbContext _context;

		public NewHabitCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<Habit> Handle(NewHabitCommand request, CancellationToken cancellationToken)
		{
			var newHabit = new Habit
			{
				HabitListId = request.ListId,
				Title = request.Title,
				Note = request.Note,
			};

			_context.Habits.Add(newHabit);
			await _context.SaveChangesAsync(cancellationToken);
			return newHabit;
		}
	}
}

