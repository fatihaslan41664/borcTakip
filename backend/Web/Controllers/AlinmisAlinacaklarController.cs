using Data.Repositories;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlinmisAlinacaklarController : ControllerBase
    {
        private readonly AlinmisAlinacaklarReposit alinmisAlinacaklarReposit;

        public AlinmisAlinacaklarController(AlinmisAlinacaklarReposit alinmisAlinacaklarReposit)
        {
            this.alinmisAlinacaklarReposit = alinmisAlinacaklarReposit;
        }

        [HttpGet("Listele")]
        public IActionResult Listele() => Ok(alinmisAlinacaklarReposit.GetAll());

        [HttpDelete("{id}")]
        public IActionResult Sil(string id)
        {
            alinmisAlinacaklarReposit.Delete(Guid.Parse(id));
            return Ok();
        }
    }
}