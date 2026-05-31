using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class VerilmisVerilecekler
    {
        public Guid Id { get; set; }
        public Guid VerileceklerId { get; set; }
        public string Isim { get; set; }
        public int OdenenMiktar { get; set; }
        public int ToplamVerilecek { get; set; }
        public DateTime OdemeTarihi { get; set; } = DateTime.Now;
    }
}
