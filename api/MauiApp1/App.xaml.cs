using Application.Common.Interfaces;
using Microsoft.Identity.Client;

namespace MauiApp1;

public partial class App : Microsoft.Maui.Controls.Application
{
	public static IPublicClientApplication PCA;

	public App(MainPage page, IUserService userService, IHabitService habitService)
	{
		InitializeComponent();
		MainPage = new NavigationPage(page);

		try
		{
#if ANDROID
			PCA = PublicClientApplicationBuilder
				.Create("7a4b572c-6712-4cc3-9229-12fdd3b9a903")
				.WithAuthority(AzureCloudInstance.AzurePublic, "common")
				.WithRedirectUri($"msal7a4b572c-6712-4cc3-9229-12fdd3b9a903://auth")
				.WithParentActivityOrWindow(() => Platform.CurrentActivity)
				.Build();
#elif IOS
            PCA = PublicClientApplicationBuilder
                .Create("7a4b572c-6712-4cc3-9229-12fdd3b9a903")
                .WithAuthority(AzureCloudInstance.AzurePublic, "common")
                .WithIosKeychainSecurityGroup("com.microsoft.adalcache")
                .WithRedirectUri($"msal7a4b572c-6712-4cc3-9229-12fdd3b9a903://auth")
                .Build();
#else
			PCA = PublicClientApplicationBuilder
				.Create("7a4b572c-6712-4cc3-9229-12fdd3b9a903")
				.WithAuthority(AzureCloudInstance.AzurePublic, "common")
				.WithRedirectUri(/*"https://login.microsoftonline.com/common/oauth2/nativeclient"*/"http://localhost")
				.Build();
#endif
		}
		catch (Exception ex)
		{
			throw;
		}
	}
}
