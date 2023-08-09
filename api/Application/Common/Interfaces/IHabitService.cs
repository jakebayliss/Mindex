using Application.Habits.Queries.GetUserHabits;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
	public interface IHabitService
	{
		Task<UserHabitsDto> GetUserHabits(Guid userId);
	}
}
