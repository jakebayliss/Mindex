using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Users.Commands.AddUser;
public class CreateJPUserCommand : IRequest<JPUser>
{
	public string Name { get; set; }
	public string Email { get; set; }
	public string Product { get; set; }
}

public class CreateJPUserCommandHandler : IRequestHandler<CreateJPUserCommand, JPUser>
{
	private readonly IApplicationDbContext _context;
	
	public CreateJPUserCommandHandler(IApplicationDbContext context)
	{
		_context = context;
	}

	public async Task<JPUser> Handle(CreateJPUserCommand command, CancellationToken cancellationToken)
	{
		var user = new JPUser
		{
			Name = command.Name,
			Email = command.Email,
			Product = command.Product,
		};
		var newUserEntity = await _context.JPUsers.AddAsync(user);
		await _context.SaveChangesAsync(cancellationToken);
		return newUserEntity.Entity;
	}
}
