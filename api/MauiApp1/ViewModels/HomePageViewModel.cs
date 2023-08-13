using Application.Habits.Queries.GetUserHabits;
using CommunityToolkit.Mvvm.ComponentModel;
using System.Collections.ObjectModel;

namespace MauiApp1.ViewModels;
public partial class HomePageViewModel : BaseViewModel
{
	[ObservableProperty]
	string name;
	
	[ObservableProperty]
	int totalLevel;
	
	[ObservableProperty]
	double totalPoints;
	
	[ObservableProperty]
	DateTime selectedDate;
	
	[ObservableProperty]
	string email;

	public ObservableCollection<HabitListDto> HabitLists { get; set; } = new();

	public HomePageViewModel()
	{
		
	}
}
