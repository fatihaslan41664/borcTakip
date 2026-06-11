using Data.Repositories;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerilmisVerileceklerController : ControllerBase
    {
        private readonly VerilmisVerileceklerReposit verilmisVerileceklerReposit;

        public VerilmisVerileceklerController(VerilmisVerileceklerReposit verilmisVerileceklerReposit)
        {
            this.verilmisVerileceklerReposit = verilmisVerileceklerReposit;
        }

        [HttpGet("Listele")]
        public IActionResult Listele() => Ok(verilmisVerileceklerReposit.GetAll());

        [HttpDelete("{id}")]
        public IActionResult Sil(string id)
        {
            verilmisVerileceklerReposit.Delete(Guid.Parse(id));
            return Ok();
        }
    }
}