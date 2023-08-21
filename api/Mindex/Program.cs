using Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.Generation.Processors.Security;

var builder = WebApplication.CreateBuilder(args);
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var config = builder.Configuration;

builder.Services.AddAuthentication(x =>
{
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
	IdentityModelEventSource.ShowPII = true;
}).AddJwtBearer(x =>
{
	x.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = config["Jwt:Issuer"],
		ValidAudience = config["Jwt:Audience"],
		IssuerSigningKeyResolver = (token, securityToken, kid, parameters) =>
		{
			var jwksEndpoint = config["Jwt:JwksEndpoint"];
			return GetPublicKeyFromJwksAsync(kid, jwksEndpoint).Result;
		}
	};
});

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApplicationServices();

builder.Services.AddOpenApiDocument(options =>
{
	options.Title = "Mindex API";
	options.DocumentName = "v1";
	options.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
	{
		Type = OpenApiSecuritySchemeType.ApiKey,
		Name = "Authorization",
		In = OpenApiSecurityApiKeyLocation.Header,
		Description = "Type into the textbox: Bearer {your JWT token}."
	});

	options.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
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

app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();

app.Run();

static async Task<IEnumerable<SecurityKey>> GetPublicKeyFromJwksAsync(string kid, string jwkEndpoint)
{
	var client = new HttpClient();
	var jwks = await client.GetStringAsync(jwkEndpoint);
	var keys = new JsonWebKeySet(jwks);
	return keys.GetSigningKeys();
}