﻿using Application.Users.Commands.AddUser;
using Application.Users.Commands.CreateUser;
using Application.Users.Common;
using Application.Users.Queries.GetJPUserProducts;
using Application.Users.Queries.GetUserFromEmail;
using Application.Users.Queries.GetUserFromUserId;
using Domain.Entities;
using DPMSeedling.WebAPI.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Mindex.Controllers
{
	public class UsersController : ApiControllerBase
	{
		private readonly IMediator _mediator;

		public UsersController(IMediator mediator)
		{
			_mediator = mediator;
		}

		[HttpGet("{userId}")]
		public async Task<UserDto> GetUser(string userId)
		{
			return await _mediator.Send(new GetUserFromUserIdQuery { UserId = new Guid(userId) });
		}

		[HttpGet("{email}")]
		public async Task<UserDto> GetUserFromEmail(string email)
		{
			return await _mediator.Send(new GetUserFromEmailQuery { Email = email });
		}

		[HttpPost("new")]
		public async Task<ActionResult<User>> CreateUser(CreateUserCommand command)
		{
			var user = await _mediator.Send(command);
			return Ok(user);
		}

		[HttpGet("/jpusers/{email}")]
		public async Task<JPUserDto> GetJPUserFromEmail(string email)
		{
			return await _mediator.Send(new GetJPUserProductsQuery { Email = email });
		}
		
		[HttpPost("newjpuser")]
		public async Task<ActionResult<JPUser>> CreateJPUser(CreateJPUserCommand command)
		{
			var user = await _mediator.Send(command);
			return Ok(user);
		}
	}
}
