using Microsoft.Extensions.Logging;
using Microsoft.Maui.LifecycleEvents;
using Microsoft.Identity.Client;
using Application.Common.Interfaces;
using Infrastructure.Services;
using MauiApp1.ViewModels;
using MauiApp1.Services;
using Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;

namespace MauiApp1;

public static partial class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
					.ConfigureLifecycleEvents(events =>
					{
#if ANDROID
            events.AddAndroid(platform =>
            {
                platform.OnActivityResult((activity, rc, result, data) =>
                {
                    AuthenticationContinuationHelper.SetAuthenticationContinuationEventArgs(rc, result, data);
                });
            });
#endif
					})
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			});

		var config = new ConfigurationBuilder()
			.AddJsonFile("appsettings.json")
			.Build();
		builder.Configuration.AddConfiguration(config);
		
		builder.Services.AddInfrastructureServices(builder.Configuration);
		builder.Services.AddApplicationServices();

		builder.Services.AddSingleton<MainPage>();
		builder.Services.AddTransient<HomePage>();
		builder.Services.AddTransient<HomePageViewModel>();

#if DEBUG
		builder.Logging.AddDebug();
#endif

		var app = builder.Build();

		ServiceHelper.Initialize(app.Services);

		return app;
	}

	static partial void UseAutoreg(IServiceCollection services);
}
