using Application.Common.Interfaces;
using MediatR;

namespace Application.Habits.Queries.GetUserHabits;

public class GetUserHabitsQuery : IRequest<UserHabitsDto>
{
	public Guid UserId { get; set; }
}

public class GetUserHabitsQueryHandler : IRequestHandler<GetUserHabitsQuery, UserHabitsDto>
{
	private readonly IHabitService _habitService;

	public GetUserHabitsQueryHandler(IHabitService habitService)
	{
		_habitService = habitService;
	}

	public async Task<UserHabitsDto> Handle(GetUserHabitsQuery query, CancellationToken cancellationToken)
	{
		return await _habitService.GetUserHabits(query.UserId);
	}
}
