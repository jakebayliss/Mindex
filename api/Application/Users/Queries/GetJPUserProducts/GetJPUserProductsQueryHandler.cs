using Application.Common.Interfaces;
using Application.Users.Common;
using MediatR;

namespace Application.Users.Queries.GetJPUserProducts;

public class GetJPUserProductsQuery : IRequest<JPUserDto>
{
	public string Email { get; set; }
}

public class GetJPUserProductsQueryHandler : IRequestHandler<GetJPUserProductsQuery, JPUserDto>
{
	private readonly IApplicationDbContext _context;

	public GetJPUserProductsQueryHandler(IApplicationDbContext context)
	{
		_context = context;
	}

	public async Task<JPUserDto> Handle(GetJPUserProductsQuery query, CancellationToken cancellationToken)
	{
		var user = _context.JPUsers.Where(x => x.Email == query.Email);

		if (user.Any())
		{
			return new JPUserDto
			{
				Name = user.FirstOrDefault().Name,
				Products = user.Select(x => x.Product).ToList()
			};
		}

		else return null;
	}
}
