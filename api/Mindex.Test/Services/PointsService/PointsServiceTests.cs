using Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mindex.Test.Services.PointsService
{
	[TestFixture]
	public class PointsServiceTests
	{
		private IPointsService _pointsService = new Infrastructure.Services.PointsService();

		[Test]
		[TestCase(0, 1)]
		[TestCase(20, 7)]
		[TestCase(100, 12)]
		[TestCase(200, 15)]
		[TestCase(400, 19)]
		[TestCase(40000, 86)]
		public void CalculatePoints_WhenCalled_ReturnsPoints(double points, int level)
		{
			// Act
			var result = _pointsService.CalculateLevel(points);
			
			// Assert\
			Assert.That(result, Is.EqualTo(level));
		}
	}
}
