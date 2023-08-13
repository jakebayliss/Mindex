using Application.Common.Interfaces;
using MauiApp1.ViewModels;
using Microsoft.Maui.ApplicationModel.Communication;
using System.Collections.ObjectModel;

namespace MauiApp1;
public partial class HomePage : ContentPage
{
	private readonly IUserService _userService;
	private readonly IHabitService _habitService;
	
	private readonly HomePageViewModel _viewModel;

	public ObservableCollection<CalendarDay> CalendarDays { get; set; } = new ObservableCollection<CalendarDay>();

	public HomePage(IUserService userService, IHabitService habitService, HomePageViewModel viewModel, string email)
	{
		InitializeComponent();
		InitializeCalendar();
		_userService = userService;
		_habitService = habitService;
		_viewModel = viewModel;
		_viewModel.Navigation = Navigation;
		_viewModel.Email = email;
		BindingContext = _viewModel;
	}

	protected override async void OnAppearing() { 
		base.OnAppearing();
		var user = await _userService.GetUserFromEmail(_viewModel.Email);
		var userHabits = await _habitService.GetUserHabits(user.UserId);
		_viewModel.Name = user.DisplayName;
		foreach(var list in userHabits.HabitLists)
		{
			_viewModel.HabitLists.Add(list);
		}
		_viewModel.TotalLevel = userHabits.HabitLists.Sum(x => x.Level);
		_viewModel.TotalPoints = userHabits.HabitLists.Sum(x => x.Points);
		_viewModel.SelectedDate = DateTime.Now;
	}

	private void InitializeCalendar()
	{
		// Simulate populating calendar data (you can customize this logic)
		DateTime currentDate = DateTime.Today;
		int daysInMonth = DateTime.DaysInMonth(currentDate.Year, currentDate.Month);

		for (int day = 1; day <= daysInMonth; day++)
		{
			CalendarDays.Add(new CalendarDay { 
				Day = day, 
				IsCurrentDay = (day == currentDate.Day && currentDate.Month == currentDate.Month && currentDate.Year == currentDate.Year) 
			});
		}

		calendarCollectionView.ItemsSource = CalendarDays;
	}
}

public class CalendarDay
{
	public int Day { get; set; }
	public bool IsCurrentDay { get; set; }
}

