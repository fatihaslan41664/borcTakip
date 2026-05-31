using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Alinacaklar
    {
        public Guid Id { get; set; }
        public string isim { get; set; }
        public string? soyisim { get; set; }
        public int BorcMiktari { get; set; }
        public DateTime BorcunVerildiğiTarih { get; set; } = DateTime.Now;
    }
}
