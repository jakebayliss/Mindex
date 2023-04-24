using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Commands.DeleteList
{
	public class DeleteListCommand : IRequest<HabitList>
	{
		public int ListId { get; set; }
	}

	public class DeleteListCommandHandler : IRequestHandler<DeleteListCommand, HabitList>
	{
		private readonly IApplicationDbContext _context;

		public DeleteListCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<HabitList> Handle(DeleteListCommand request, CancellationToken cancellationToken)
		{
			var habitList = await _context.HabitLists.FirstOrDefaultAsync(x => x.Id == request.ListId, cancellationToken);

			if (habitList == null)
			{
				throw new NotFoundException(nameof(HabitList), request.ListId);
			}

			_context.HabitLists.Remove(habitList);
			await _context.SaveChangesAsync(cancellationToken);
			return habitList;
		}
	}
}
