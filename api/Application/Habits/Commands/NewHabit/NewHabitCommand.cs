using Application.Common.Interfaces;
using Application.Habits.Queries.GetUserHabits;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Commands.NewHabit
{
	public class NewHabitCommand : IRequest<HabitListDto>
	{
		public int ListId { get; set; }
		public string Title { get; set; }
		public string? Note { get; set; }
	}

	public class NewHabitCommandHandler : IRequestHandler<NewHabitCommand, HabitListDto>
	{
		private readonly IApplicationDbContext _context;

		public NewHabitCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<HabitListDto> Handle(NewHabitCommand request, CancellationToken cancellationToken)
		{
			var newHabit = new Habit
			{
				HabitListId = request.ListId,
				Title = request.Title,
				Note = request.Note,
				CreatedOn = DateTime.Now
			};

			_context.Habits.Add(newHabit);
			await _context.SaveChangesAsync(cancellationToken);

			var list = _context.HabitLists.Where(x => x.Id == request.ListId).Include(x => x.Habits).FirstOrDefault();
			return new HabitListDto
			{
				Id = list.Id,
				Title = list.Title,
				CreatedOn = list.CreatedOn,
				Habits = list.Habits.Select(x => new HabitDto
				{
					Id = x.Id,
					Title = x.Title,
					Note = x.Note,
					Reminder = x.Reminder,
					CreatedOn = x.CreatedOn,
					ListId = x.HabitListId
				}).OrderBy(x => x.CreatedOn).ToList()
			};
		}
	}
}

