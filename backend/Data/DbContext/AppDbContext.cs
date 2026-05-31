using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.DbContextfile
{
    public class AppDbContext: DbContext
    {
        public DbSet<Alinacaklar> Alinacaklars {  get; set; }
        public DbSet<Verilecekler> Verileceklers { get; set; }
        public DbSet<AlinmisAlinacaklar> AlinmisAlinacaklars { get; set; }
        public DbSet<VerilmisVerilecekler> VerilmisVerileceklers { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
