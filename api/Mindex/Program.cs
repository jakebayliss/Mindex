using Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApplicationServices();

builder.Services.AddOpenApiDocument(options =>
{
	options.Title = "Mindex API";
});

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: MyAllowSpecificOrigins, builder =>
	{
		builder.WithOrigins("*")
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
	try
	{
		var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitialiser>();
		await initialiser.InitialiseAsync();
	}
	catch (Exception ex)
	{
		var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
		logger.LogError(ex, "An error occurred during database initialisation.");

		throw;
	}
}

app.UseOpenApi();
app.UseSwaggerUi3();

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();

app.Run();
