using Application.Common.Interfaces;
using MauiApp1.ViewModels;
using Microsoft.Maui.ApplicationModel.Communication;

namespace MauiApp1;
public partial class HomePage : ContentPage
{
	private readonly IUserService _userService;
	private readonly IHabitService _habitService;
	
	private readonly HomePageViewModel _viewModel;

	public HomePage(IUserService userService, IHabitService habitService, HomePageViewModel viewModel, string email)
	{
		InitializeComponent();
		_userService = userService;
		_habitService = habitService;
		_viewModel = viewModel;
		_viewModel.Navigation = Navigation;
		_viewModel.Email = email;
		BindingContext = viewModel;
	}

	protected override async void OnAppearing() { 
		base.OnAppearing();
		var user = await _userService.GetUserFromEmail(_viewModel.Email);
		var userHabits = await _habitService.GetUserHabits(user.UserId);
	}
}

