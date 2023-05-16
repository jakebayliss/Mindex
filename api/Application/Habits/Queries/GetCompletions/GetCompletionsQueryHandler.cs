using Application.Common.Interfaces;
using Domain.Entities;
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
		public int HabitId { get; set; }
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
			var completions = _context.Completions.Where(x => x.UserId == request.UserId);
			if (!completions.Any())
			{
				return new List<CompletionDto>();
			}

			return completions.Select(x => new CompletionDto
			{
				HabitId = x.HabitId,
				CompletedOn = x.CompletedOn
			});
		}
	}
}
