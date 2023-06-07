using Application.Common.Interfaces;
using Application.Habits.Queries.GetUserHabits;
using MediatR;

namespace Application.Completions.Queries.GetCompletions
{
	public class GetCompletionsQuery : IRequest<IEnumerable<CompletionDto>>
	{
		public Guid UserId { get; set; }
		public int Days { get; set; }
	}

	public class CompletionDto
	{
		public int ListId { get; set; }
		public HabitDto Habit { get; set; }
		public DateTime CompletedOn { get; set; }
		public double Points { get; set; }
		public int Level { get; set; }
	}

	public class GetCompletionsQueryHandler : IRequestHandler<GetCompletionsQuery, IEnumerable<CompletionDto>>
	{
		private readonly IApplicationDbContext _context;

		public GetCompletionsQueryHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<CompletionDto>> Handle(GetCompletionsQuery request, CancellationToken cancellationToken)
		{
			var completions = _context.Completions.Where(x => x.UserId == request.UserId).ToList();
			var habits = _context.HabitLists.Where(x => x.UserId == request.UserId).SelectMany(x => x.Habits).ToList();
			if (!completions.Any())
			{
				return new List<CompletionDto>();
			}

			return completions.Select(x =>
			{
				var habit = habits.FirstOrDefault(h => h.Id == x.HabitId);
				return new CompletionDto
				{
					Habit = new HabitDto
					{
						Id = habit.Id,
						ListId = habit.HabitListId,
						Points = habit.Points,
						Level = habit.Level
					},
					CompletedOn = x.CompletedOn
				};
			});
		}
	}
}
