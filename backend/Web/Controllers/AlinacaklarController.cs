using Data.Repositories;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlinacaklarController : ControllerBase
    {
        private readonly AlinacaklarReposit alinacaklarReposit;
        private readonly AlinmisAlinacaklarReposit alinmisalinacaklarrepo;

        public AlinacaklarController(AlinacaklarReposit alinacaklarReposit, AlinmisAlinacaklarReposit alinmisalinacaklarrepo)
        {
            this.alinacaklarReposit = alinacaklarReposit;
            this.alinmisalinacaklarrepo = alinmisalinacaklarrepo;
        }

        [HttpPost("Ekle")]
        public IActionResult Ekle(string isim, int BorcMiktari, DateTime tarih)
        {
            var alinacak = new Alinacaklar
            {
                Id = Guid.NewGuid(),
                isim = isim,
                BorcMiktari = BorcMiktari,
                BorcunVerildiğiTarih = tarih == default ? DateTime.Now : tarih
            };
            alinacaklarReposit.Add(alinacak);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult sil(string id)
        {
            alinacaklarReposit.Delete(Guid.Parse(id));
            return Ok();
        }

        [HttpGet("Listele")]
        public IActionResult Listele() => Ok(alinacaklarReposit.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(string id) => Ok(alinacaklarReposit.GetById(Guid.Parse(id)));

        [HttpPost("BorcOde")]
        public IActionResult BorcOde(string alinacaklarId, int odenenMiktar, bool hepsiniOde = false)
        {
            var guid = Guid.Parse(alinacaklarId);
            var kayit = alinacaklarReposit.GetById(guid);
            if (kayit == null) return NotFound();

            int odenecekMiktar = hepsiniOde ? kayit.BorcMiktari : odenenMiktar;
            odenecekMiktar = Math.Min(odenecekMiktar, kayit.BorcMiktari);

            var odeme = new AlinmisAlinacaklar
            {
                Id = Guid.NewGuid(),
                AlinacaklarId = guid,
                Isim = kayit.isim,
                OdenenMiktar = odenecekMiktar,
                ToplamBorc = kayit.BorcMiktari,
                OdemeTarihi = DateTime.Now
            };
            alinmisalinacaklarrepo.Add(odeme);
            kayit.BorcMiktari -= odenecekMiktar;
            alinacaklarReposit.Update(kayit);
            return Ok();
        }
    }
}
