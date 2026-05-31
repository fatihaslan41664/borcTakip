using Data.DbContextfile;
using Entities;

namespace Data.Repositories
{
    public class VerileceklerReposit
    {
        private readonly AppDbContext dbContext;

        public VerileceklerReposit(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Verilecekler> GetAll()
        {
            return dbContext.Verileceklers.ToList();
        }

        public Verilecekler GetById(Guid id)
        {
            return dbContext.Verileceklers.FirstOrDefault(x => x.Id == id);
        }

        public void Add(Verilecekler verilecek)
        {
            dbContext.Verileceklers.Add(verilecek);
            dbContext.SaveChanges();
        }

        public void Update(Verilecekler verilecek)
        {
            dbContext.Verileceklers.Update(verilecek);
            dbContext.SaveChanges();
        }

        public void Delete(Guid id)
        {
            var entity = dbContext.Verileceklers.FirstOrDefault(x => x.Id == id);
            if (entity != null)
            {
                dbContext.Verileceklers.Remove(entity);
                dbContext.SaveChanges();
            }
        }
    }
}