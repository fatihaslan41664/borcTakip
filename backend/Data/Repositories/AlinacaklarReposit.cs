using Data.DbContextfile;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class AlinacaklarReposit
    {
        private readonly AppDbContext dbContext;

        public AlinacaklarReposit(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Alinacaklar> GetAll()
        {
            return dbContext.Alinacaklars.ToList();
        }

        public Alinacaklar GetById(Guid id)
        {
            return dbContext.Alinacaklars.FirstOrDefault(x => x.Id == id);
        }

        public void Add(Alinacaklar alinacak)
        {
            dbContext.Alinacaklars.Add(alinacak);
            dbContext.SaveChanges();
        }

        public void Update(Alinacaklar alinacak)
        {
            dbContext.Alinacaklars.Update(alinacak);
            dbContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var entity = dbContext.Alinacaklars.FirstOrDefault(x => x.Id == id);
            if (entity != null)
            {
                dbContext.Alinacaklars.Remove(entity);
                dbContext.SaveChanges();
            }
        }
    }
}
