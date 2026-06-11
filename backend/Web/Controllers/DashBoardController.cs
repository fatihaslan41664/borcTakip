using Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashBoardService dashBoardService;

        public DashboardController(DashBoardService dashBoardService)
        {
            this.dashBoardService = dashBoardService;
        }

        [HttpGet]
        public IActionResult Get() => Ok(dashBoardService.GetDashboard());
    }
}