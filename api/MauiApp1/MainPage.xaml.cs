using Microsoft.Datasync.Client;
using Microsoft.Identity.Client;
using Microsoft.Maui.ApplicationModel.Communication;
using System.Diagnostics;

namespace MauiApp1;

public partial class MainPage : ContentPage
{
	public MainPage()
	{
		InitializeComponent();
	}

	private async void OnSignInClicked(object sender, EventArgs e)
	{
		var accounts = await App.PCA.GetAccountsAsync();
		AuthenticationResult result = null;
		bool tryInteractiveLogin = false;

		try
		{
			result = await App.PCA.AcquireTokenSilent(new List<string> { "https://mindexb2c.onmicrosoft.com/api/read" }, accounts.FirstOrDefault())
				.ExecuteAsync();

			await Navigation.PushAsync(new HomePage());
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
				await Navigation.PushAsync(new HomePage{ BindingContext = name });
			}
			catch (Exception ex)
			{
				Debug.WriteLine($"MSAL Interactive Error: {ex.Message}");
			}
		}
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

