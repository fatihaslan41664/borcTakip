using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class AlinmisAlinacaklar
    {
        public Guid Id { get; set; }
        public Guid AlinacaklarId { get; set; }
        public string Isim { get; set; }
        public int OdenenMiktar { get; set; }
        public int ToplamBorc { get; set; }
        public DateTime OdemeTarihi { get; set; } = DateTime.Now;
    }
}
