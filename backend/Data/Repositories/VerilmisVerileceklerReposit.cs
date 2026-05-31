using Data.DbContextfile;
using Entities;

namespace Data.Repositories
{
    public class VerilmisVerileceklerReposit
    {
        private readonly AppDbContext dbContext;

        public VerilmisVerileceklerReposit(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<VerilmisVerilecekler> GetAll()
        {
            return dbContext.VerilmisVerileceklers.ToList();
        }

        public VerilmisVerilecekler GetById(Guid id)
        {
            return dbContext.VerilmisVerileceklers.FirstOrDefault(x => x.Id == id);
        }

        public void Add(VerilmisVerilecekler verilmis)
        {
            dbContext.VerilmisVerileceklers.Add(verilmis);
            dbContext.SaveChanges();
        }

        public void Update(VerilmisVerilecekler verilmis)
        {
            dbContext.VerilmisVerileceklers.Update(verilmis);
            dbContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var entity = dbContext.VerilmisVerileceklers.FirstOrDefault(x => x.Id == id);
            if (entity != null)
            {
                dbContext.VerilmisVerileceklers.Remove(entity);
                dbContext.SaveChanges();
            }
        }
    }
}