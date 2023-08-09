using Domain.Entities;

namespace Application.Common.Interfaces;
public interface IUserService
{
	Task<User> GetUserFromUserId(Guid userId);
	Task<User> GetUserFromEmail(string email);
}
