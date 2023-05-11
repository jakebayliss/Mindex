using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
	public class User
	{
		public Guid UserId { get; set; }
		public string DisplayName { get; set; }
		public double Points { get; set; }
	}
}
