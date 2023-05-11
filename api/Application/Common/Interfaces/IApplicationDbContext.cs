using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
	DbSet<User> Users { get; }
	
	DbSet<HabitList> HabitLists { get; }

	DbSet<Habit> Habits { get; }
	
	DbSet<Completion> Completions { get; }

	Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
