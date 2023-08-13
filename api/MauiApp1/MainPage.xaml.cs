using Application.Common.Interfaces;
using MauiApp1.ViewModels;
using Microsoft.Identity.Client;
using System.Diagnostics;
using Maui.Plugins.PageResolver;
using Microsoft.Maui.ApplicationModel.Communication;

namespace MauiApp1;

public partial class MainPage : ContentPage
{
	private readonly IUserService _userService;
	private readonly IHabitService _habitService;

	public MainPage(IUserService userService, IHabitService habitService)
	{
		InitializeComponent();
		_userService = userService;
		_habitService = habitService;
	}

	private async void OnSignInClicked(object sender, EventArgs e)
	{
#if DEBUG
		await Navigation.PushAsync(new HomePage(_userService, _habitService, new HomePageViewModel(), "bayliss.jw@gmail.com"));
#else
		var accounts = await App.PCA.GetAccountsAsync();
		AuthenticationResult result = null;
		bool tryInteractiveLogin = false;

		try
		{
			result = await App.PCA.AcquireTokenSilent(new List<string> { "https://mindexb2c.onmicrosoft.com/api/read" }, accounts.FirstOrDefault())
				.ExecuteAsync();

			var email = result.ClaimsPrincipal.Claims.FirstOrDefault(x => x.Type == "preferred_username");
			await Navigation.PushAsync(new HomePage(_userService, _habitService, new HomePageViewModel(), email.Value));
		}
		catch (MsalUiRequiredException)
		{
			tryInteractiveLogin = true;
		}
		catch (Exception ex)
		{
			Debug.WriteLine($"MSAL Silent Error: {ex.Message}");
		}

		if (tryInteractiveLogin)
		{
			try
			{
				result = await App.PCA.AcquireTokenInteractive(new List<string> { "https://mindexb2c.onmicrosoft.com/api/read" })
					.ExecuteAsync();

				var name = result.ClaimsPrincipal.Claims.FirstOrDefault(x => x.Type == "name");
				var email = result.ClaimsPrincipal.Claims.FirstOrDefault(x => x.Type == "preferred_username");
				await Navigation.PushAsync(new HomePage(_userService, _habitService, new HomePageViewModel(), email.Value));
			}
			catch (Exception ex)
			{
				Debug.WriteLine($"MSAL Interactive Error: {ex.Message}");
			}
		}
#endif
	}

	private async void OnSignOutClicked(object sender, EventArgs e)
	{
		var accounts = await App.PCA.GetAccountsAsync();
		try
		{
			while (accounts.Any())
			{
				await App.PCA.RemoveAsync(accounts.FirstOrDefault());
				accounts = await App.PCA.GetAccountsAsync();
			}
			// Handle successful sign-out (e.g., show a message)
		}
		catch (MsalException ex)
		{
			// Handle sign-out error
		}
	}
}

