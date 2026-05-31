using Data.Repositories;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerileceklerController : ControllerBase
    {
        private readonly VerileceklerReposit verileceklerReposit;
        private readonly VerilmisVerileceklerReposit verilmisverileceklerrepo;

        public VerileceklerController(VerileceklerReposit verileceklerReposit, VerilmisVerileceklerReposit verilmisverileceklerrepo)
        {
            this.verileceklerReposit = verileceklerReposit;
            this.verilmisverileceklerrepo = verilmisverileceklerrepo;
        }

        [HttpPost("Ekle")]
        public IActionResult Ekle(string isim, int BorcMiktari, DateTime tarih)
        {
            var verilecek = new Verilecekler
            {
                Id = Guid.NewGuid(),
                isim = isim,
                BorcMiktari = BorcMiktari,
                BorcunVerildiğiTarih = tarih == default ? DateTime.Now : tarih
            };
            verileceklerReposit.Add(verilecek);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Sil(string id)
        {
            verileceklerReposit.Delete(Guid.Parse(id));
            return Ok();
        }

        [HttpGet("Listele")]
        public IActionResult Listele() => Ok(verileceklerReposit.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(string id) => Ok(verileceklerReposit.GetById(Guid.Parse(id)));

        [HttpPost("BorcOde")]
        public IActionResult BorcOde(string verileceklerId, int odenenMiktar, bool hepsiniOde = false)
        {
            var guid = Guid.Parse(verileceklerId);
            var kayit = verileceklerReposit.GetById(guid);
            if (kayit == null) return NotFound();

            int odenecekMiktar = hepsiniOde ? kayit.BorcMiktari : odenenMiktar;
            odenecekMiktar = Math.Min(odenecekMiktar, kayit.BorcMiktari);

            var odeme = new VerilmisVerilecekler
            {
                Id = Guid.NewGuid(),
                VerileceklerId = guid,
                Isim = kayit.isim,
                OdenenMiktar = odenecekMiktar,
                ToplamVerilecek = kayit.BorcMiktari,
                OdemeTarihi = DateTime.Now
            };

            verilmisverileceklerrepo.Add(odeme);
            kayit.BorcMiktari -= odenecekMiktar;
            verileceklerReposit.Update(kayit);
            return Ok();
        }
    }
}