using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mindex.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HabitsController : ControllerBase
	{
		[HttpGet]
		public ActionResult Hey()
		{
			return Ok("Hey");
		}
	}
}
