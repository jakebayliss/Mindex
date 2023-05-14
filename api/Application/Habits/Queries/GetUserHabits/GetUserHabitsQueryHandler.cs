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
	private readonly IPointsService _pointsService;

	public GetUserHabitsQueryHandler(IApplicationDbContext context, IMapper mapper, IPointsService pointsService)
	{
		_context = context;
		_mapper = mapper;
		_pointsService = pointsService;
	}

	public async Task<UserHabitsDto> Handle(GetUserHabitsQuery query, CancellationToken cancellationToken)
	{
		var userHabitsLists = _context.HabitLists.Where(x => x.UserId == query.UserId).Include(x => x.Habits).ToList();
		var user = _context.Users.Where(x => x.UserId == query.UserId).FirstOrDefault();
		var points = user?.Points;
		var level = _pointsService.CalculateLevel(points ?? 0);
		return new UserHabitsDto { 
			HabitLists = userHabitsLists.Select(x => new HabitListDto
			{
				Id = x.Id,
				Title = x.Title,
				Habits = x.Habits.Select(y => new HabitDto
				{
					Id = y.Id,
					Title = y.Title,
					Note = y.Note,
					Reminder = y.Reminder,
					ListId = x.Id
				}).OrderBy(x => x.CreatedOn).ToList(),
				Points = points ?? 0,
				Level = level
			}) 
		};
	}
}
