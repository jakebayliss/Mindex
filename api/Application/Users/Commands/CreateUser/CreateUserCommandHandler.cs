using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Users.Commands.CreateUser
{
	public class CreateUserCommand : IRequest<User>
	{
		public Guid UserId { get; set; }
		public string DisplayName { get; set; }
	}
	public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, User>
	{
		private readonly IApplicationDbContext _context;

		public CreateUserCommandHandler(IApplicationDbContext context)
		{
			_context = context;
		}

		public async Task<User> Handle(CreateUserCommand command, CancellationToken cancellationToken)
		{
			var user = new User
			{
				UserId = command.UserId,
				DisplayName = command.DisplayName
			};
			_context.Users.Add(user);
			await _context.SaveChangesAsync(cancellationToken);

			var now = DateTime.Now;
			await _context.HabitLists.AddRangeAsync(new List<HabitList>
			{
				new HabitList
				{
					CreatedOn = now,
					Title = "Daily",
					UserId = command.UserId
				},
				new HabitList
				{
					CreatedOn = now,
					Title = "Weekly",
					UserId = command.UserId
				}
			});
			await _context.SaveChangesAsync(cancellationToken);
			
			return user;
		}
	}
}
