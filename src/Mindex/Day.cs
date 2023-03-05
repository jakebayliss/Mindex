using System.Collections.Generic;

namespace Mindex
{
	public class Day
	{
		public string Name { get; set; }
		public string ShortName { get; set; }
		public int Index { get; set; }

		public static List<Day> GetDays()
		{
			return new List<Day>() { 
				new Day { Name = "Sunday", ShortName = "S", Index = 0 },
				new Day { Name = "Monday", ShortName = "M", Index = 1 },
				new Day { Name = "Tuesday", ShortName = "T", Index = 2 },
				new Day { Name = "Wednesday", ShortName = "W", Index = 3 },
				new Day { Name = "Thursday", ShortName = "T", Index = 4 },
				new Day { Name = "Friday", ShortName = "F", Index = 5 },
				new Day { Name = "Saturday", ShortName = "S", Index = 6 }
			};
		}
	}
}
