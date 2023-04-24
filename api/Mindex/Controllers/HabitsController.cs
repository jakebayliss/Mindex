using Application.Habits.Commands.DeleteHabit;
using Application.Habits.Commands.DeleteList;
using Application.Habits.Commands.NewHabit;
using Application.Habits.Commands.NewList;
using Application.Habits.Commands.UpdateHabit;
using Application.Habits.Commands.UpdateList;
using Application.Habits.Queries.GetUserHabits;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Mindex.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HabitsController : ControllerBase
	{
		private readonly IMediator _mediator;
		
		public HabitsController(IMediator mediator)
		{
			_mediator = mediator;
		}
		
		[HttpGet("{userId}")]
		public async Task<ActionResult<UserHabitsDto>> GetUserHabits(string userId)
		{
			var habits = await _mediator.Send(new GetUserHabitsQuery { UserId = Guid.Parse(userId) });
			return Ok(habits);
		}

		[HttpPost("{userId}/newList")]
		public async Task<ActionResult<HabitListDto>> CreateHabitList(string userId, NewListCommand command)
		{
			var newList = await _mediator.Send(command);
			return Ok(newList);
		}

		[HttpPost("{userId}/newHabit")]
		public async Task<ActionResult<HabitListDto>> CreateHabit(string userId, NewHabitCommand command)
		{
			var newHabit = await _mediator.Send(command);
			return Ok(newHabit);
		}

		[HttpPut("{userId}/updateHabit")]
		public async Task<ActionResult<HabitDto>> UpdateHabit(string userId, UpdateHabitCommand command)
		{
			var updatedHabit = await _mediator.Send(command);
			return Ok(updatedHabit);
		}

		[HttpDelete("{userId}/deleteHabit")]
		public async Task<ActionResult<Habit>> DeleteHabit(string userId, DeleteHabitCommand command)
		{
			var deletedHabit = await _mediator.Send(command);
			return Ok(deletedHabit);
		}

		[HttpDelete("{userId}/deleteList")]
		public async Task<ActionResult<HabitList>> DeleteHabitList(string userId, DeleteListCommand command)
		{
			var deletedList = await _mediator.Send(command);
			return Ok(deletedList);
		}

		[HttpPut("{userId}/updateList")]
		public async Task<ActionResult<HabitList>> UpdateHabitList(string userId, UpdateListCommand command)
		{
			var updatedList = await _mediator.Send(command);
			return Ok(updatedList);
		}
	}
}
