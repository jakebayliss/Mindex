using Application.Common.Interfaces;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Interceptors;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
	public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddScoped<AuditableEntitySaveChangesInterceptor>();
		
		services.AddDbContext<ApplicationDbContext>(options =>
			options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
				builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

		services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

		services.AddScoped<ApplicationDbContextInitialiser>();

		services.AddTransient<IDateTime, DateTimeService>();
		services.AddTransient<IPointsService, PointsService>();

		return services;
	}
}
