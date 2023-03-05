namespace Mindex
{
	public class Calendar
	{
		public Day Day { get; set; }
		public int Date { get; set; }

		public static List<Calendar> GetCalendar(DateTime date)
		{
			DateTime firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
			DateTime lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
			var days = Day.GetDays();

			var calendars = new List<Calendar>();
			for(int i = 1; i < lastDayOfMonth.Day; i++)
			{
				var currentDate = new DateTime(date.Year, date.Month, i);
				var day = days.FirstOrDefault(x => x.Name == currentDate.DayOfWeek.ToString());
				calendars.Add(new Calendar { Day = day, Date = i });
			}
			return calendars;
		}
	}
}
