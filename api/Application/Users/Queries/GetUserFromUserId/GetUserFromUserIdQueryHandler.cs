using Application.Common.Interfaces;
using Application.Users.Common;
using MediatR;

namespace Application.Users.Queries.GetUserFromUserId;
public class GetUserFromUserIdQuery : IRequest<UserDto>
{
	public Guid UserId { get; set; }
}

public class GetUserFromUserIdQueryHandler : IRequestHandler<GetUserFromUserIdQuery, UserDto>
{
	private readonly IUserService _userService;
	private readonly IPointsService _pointsService;

	public GetUserFromUserIdQueryHandler(IUserService userService, IPointsService pointsService)
	{
		_userService = userService;
		_pointsService = pointsService;
	}
	public async Task<UserDto> Handle(GetUserFromUserIdQuery query, CancellationToken cancellationToken)
	{
		var user = await _userService.GetUserFromUserId(query.UserId);
		if (user == null)
		{
			return null;
		}

		var level = _pointsService.CalculateLevel(user.Points);
		
		return new UserDto
		{
			Points = user.Points,
			Level = level,
			CreatedOn = user.CreatedOn
		};
	}
}
