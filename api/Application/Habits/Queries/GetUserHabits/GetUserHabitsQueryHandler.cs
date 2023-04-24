using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Habits.Queries.GetUserHabits;

public class GetUserHabitsQuery : IRequest<UserHabitsDto>
{
	public Guid UserId { get; set; }
}

public class GetUserHabitsQueryHandler : IRequestHandler<GetUserHabitsQuery, UserHabitsDto>
{
	private readonly IApplicationDbContext _context;
	private readonly IMapper _mapper;

	public GetUserHabitsQueryHandler(IApplicationDbContext context, IMapper mapper)
	{
		_context = context;
		_mapper = mapper;
	}

	public async Task<UserHabitsDto> Handle(GetUserHabitsQuery query, CancellationToken cancellationToken)
	{
		var userHabitsLists = _context.HabitLists.Where(x => x.UserId == query.UserId).Include(x => x.Habits).ToList();
		return new UserHabitsDto { 
			HabitLists = userHabitsLists.Select(x => new HabitListDto
			{
				Id = x.Id,
				Title = x.Title,
				Habits = x.Habits.Select(y => new HabitDto
				{
					Title = y.Title,
					Note = y.Note,
					Reminder = y.Reminder,
					ListId = x.Id
				}).ToList()
			}) 
		};
	}
}
