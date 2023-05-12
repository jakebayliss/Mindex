using Application.Common.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Mindex.Test
{
	public class Tests
	{
		[OneTimeSetUp]
		public async Task RunBeforeAnyTests()
		{

		}
		
		[SetUp]
		public void Setup()
		{
		}

		[Test]
		public void Test1()
		{
			Assert.Pass();
		}
	}
}