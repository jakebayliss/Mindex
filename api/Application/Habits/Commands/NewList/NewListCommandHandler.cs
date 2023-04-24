using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Habits.Commands.NewList
{
	public class NewListCommand : IRequest<HabitList>
	{
		public Guid UserId { get; set; }
		public HabitList HabitList { get; set; }
	}

	public class NewListCommandHandler : IRequestHandler<NewListCommand, HabitList>
	{
		private readonly IApplicationDbContext _context;

		public NewListCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<HabitList> Handle(NewListCommand request, CancellationToken cancellationToken)
		{
			var newList = new HabitList
			{
				UserId = request.UserId,
				Title = request.HabitList.Title
			};
			_context.HabitLists.Add(newList);
			await _context.SaveChangesAsync(cancellationToken);
			return newList;
		}
	}
}
