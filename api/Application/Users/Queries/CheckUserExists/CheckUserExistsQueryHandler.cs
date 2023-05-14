using Application.Common.Interfaces;
using AutoMapper;
using MediatR;

namespace Application.Users.Queries.CheckUserExists
{
	public class GetUserQuery : IRequest<UserDto>
	{
		public Guid UserId { get; set; }
	}

	public class UserDto
	{
		public double Points { get; set; }
		public int Level { get; set; }
	}

	public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserDto>
	{
		private readonly IApplicationDbContext _context;
		private readonly IPointsService _pointsService;

		public GetUserQueryHandler(IApplicationDbContext context, IPointsService pointsService)
		{
			_context = context;
			_pointsService = pointsService;
		}
		public async Task<UserDto> Handle(GetUserQuery query, CancellationToken cancellationToken)
		{
			var user = _context.Users.FirstOrDefault(x => x.UserId == query.UserId);
			if (user == null)
			{
				return null;
			}

			var level = _pointsService.CalculateLevel(user.Points);
			
			return new UserDto
			{
				Points = user.Points,
				Level = level
			};
		}
	}
}
