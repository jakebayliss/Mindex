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
		builder.WithOrigins("*").AllowAnyHeader()
							.AllowAnyMethod(); ;
	});
});

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseOpenApi();
	app.UseSwaggerUi3(settings =>
	{
		settings.Path = "/api";
		settings.DocumentPath = "/api/specification.json";
	});
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
