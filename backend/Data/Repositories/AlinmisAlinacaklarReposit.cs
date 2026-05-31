using Data.DbContextfile;
using Entities;

namespace Data.Repositories
{
    public class AlinmisAlinacaklarReposit
    {
        private readonly AppDbContext dbContext;

        public AlinmisAlinacaklarReposit(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<AlinmisAlinacaklar> GetAll()
        {
            return dbContext.AlinmisAlinacaklars.ToList();
        }

        public AlinmisAlinacaklar GetById(Guid id)
        {
            return dbContext.AlinmisAlinacaklars.FirstOrDefault(x => x.Id == id);
        }

        public void Add(AlinmisAlinacaklar alinmis)
        {
            dbContext.AlinmisAlinacaklars.Add(alinmis);
            dbContext.SaveChanges();
        }

        public void Update(AlinmisAlinacaklar alinmis)
        {
            dbContext.AlinmisAlinacaklars.Update(alinmis);
            dbContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var entity = dbContext.AlinmisAlinacaklars.FirstOrDefault(x => x.Id == id);
            if (entity != null)
            {
                dbContext.AlinmisAlinacaklars.Remove(entity);
                dbContext.SaveChanges();
            }
        }
    }
}