using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Commands.UpdateList
{
	public class UpdateListCommand : IRequest<HabitList>
	{
		public HabitList HabitList { get; set; }
	}

	public class UpdateListCommandHandler : IRequestHandler<UpdateListCommand, HabitList>
	{
		private readonly IApplicationDbContext _context;

		public UpdateListCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<HabitList> Handle(UpdateListCommand request, CancellationToken cancellationToken)
		{
			var habitList = await _context.HabitLists.FirstOrDefaultAsync(x => x.Id == request.HabitList.Id, cancellationToken);

			if (habitList == null)
			{
				throw new NotFoundException(nameof(HabitList), request.HabitList.Id);
			}

			habitList.Title = request.HabitList.Title;
			_context.HabitLists.Add(habitList);
			await _context.SaveChangesAsync(cancellationToken);
			return habitList;
		}
	}
}
