using Application.Common.Interfaces;
using Application.Habits.Queries.GetUserHabits;
using Domain.Entities;
using MediatR;
using System.Security.Cryptography.X509Certificates;

namespace Application.Habits.Commands.NewList
{
	public class NewListCommand : IRequest<HabitListDto>
	{
		public Guid UserId { get; set; }
		public string Title { get; set; }
	}

	public class NewListCommandHandler : IRequestHandler<NewListCommand, HabitListDto>
	{
		private readonly IApplicationDbContext _context;

		public NewListCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<HabitListDto> Handle(NewListCommand request, CancellationToken cancellationToken)
		{
			var newList = new HabitList
			{
				UserId = request.UserId,
				Title = request.Title
			};
			_context.HabitLists.Add(newList);
			await _context.SaveChangesAsync(cancellationToken);
			return new HabitListDto
			{
				Id = newList.Id,
				Title = newList.Title
			};
		}
	}
}
