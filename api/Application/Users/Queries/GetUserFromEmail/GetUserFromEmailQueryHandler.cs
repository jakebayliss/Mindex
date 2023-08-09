using Application.Common.Interfaces;
using Application.Users.Common;
using MediatR;

namespace Application.Users.Queries.GetUserFromEmail;

public class GetUserFromEmailQuery : IRequest<UserDto>
{
	public string Email { get; set; }
}

public class GetUserFromEmailQueryHandler : IRequestHandler<GetUserFromEmailQuery, UserDto>
{
	private readonly IUserService _userService;
	private readonly IPointsService _pointsService;

	public GetUserFromEmailQueryHandler(IUserService userService, IPointsService pointsService)
	{
		_userService = userService;
		_pointsService = pointsService;
	}
	public async Task<UserDto> Handle(GetUserFromEmailQuery query, CancellationToken cancellationToken)
	{
		var user = await _userService.GetUserFromEmail(query.Email);
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
