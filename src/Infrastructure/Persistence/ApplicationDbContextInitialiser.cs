﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Persistence;

public class ApplicationDbContextInitialiser
{
	private readonly ILogger<ApplicationDbContextInitialiser> _logger;
	private readonly ApplicationDbContext _context;

	public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context)
	{
		_logger = logger;
		_context = context;
	}

	public async Task InitialiseAsync()
	{
		try
		{
			if (_context.Database.IsSqlServer())
			{
				await _context.Database.MigrateAsync();
			}
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "An error occurred while initialising the database.");
			throw;
		}
	}

	public async Task SeedAsync()
	{
		try
		{
			await TrySeedAsync();
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "An error occurred while seeding the database.");
			throw;
		}
	}

	public async Task TrySeedAsync()
	{
		// Default data
		// Seed, if necessary
		if (!_context.HabitLists.Any())
		{
			_context.HabitLists.Add(new HabitList
			{
				Title = "Todo List",
				Habits =
				{
					new Habit { Title = "Make a todo list 📃" },
					new Habit { Title = "Check off the first item ✅" },
					new Habit { Title = "Realise you've already done two things on the list! 🤯"},
					new Habit { Title = "Reward yourself with a nice, long nap 🏆" },
				}
			});

			await _context.SaveChangesAsync();
		}
	}
}
