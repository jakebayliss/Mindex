using Application.Common.Interfaces;
using Domain.Entities;

namespace Infrastructure.Services;
public class UserService : IUserService
{
	private readonly IApplicationDbContext _context;
	
	public UserService(IApplicationDbContext context)
	{
		_context = context;
	}

	public async Task<User> GetUserFromUserId(Guid userId)
	{
		return _context.Users.FirstOrDefault(x => x.UserId == userId);
	}

	public async Task<User> GetUserFromEmail(string email)
	{
		return _context.Users.FirstOrDefault(x => x.Email == email);
	}
}
