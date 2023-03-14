using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
	DbSet<HabitList> HabitLists { get; }

	DbSet<Habit> Habits { get; }

	Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
