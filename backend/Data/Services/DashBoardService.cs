using Data.Repositories;

namespace Data.Services
{
    public class DashboardDto
    {
        public int ToplamAlinacak { get; set; }
        public int TahsilEdilen { get; set; }
        public int ToplamVerilecek { get; set; }
        public int Verilmis { get; set; }
    }

    public class DashBoardService
    {
        private readonly AlinacaklarReposit alinacaklarReposit;
        private readonly AlinmisAlinacaklarReposit odenmisBorclarReposit;
        private readonly VerileceklerReposit verileceklerReposit;
        private readonly VerilmisVerileceklerReposit verilmisVerilecekReposit;

        public DashBoardService(
            AlinacaklarReposit alinacaklarReposit,
            AlinmisAlinacaklarReposit odenmisBorclarReposit,
            VerileceklerReposit verileceklerReposit,
            VerilmisVerileceklerReposit verilmisVerilecekReposit)
        {
            this.alinacaklarReposit = alinacaklarReposit;
            this.odenmisBorclarReposit = odenmisBorclarReposit;
            this.verileceklerReposit = verileceklerReposit;
            this.verilmisVerilecekReposit = verilmisVerilecekReposit;
        }

        public DashboardDto GetDashboard()
        {
            var kalanAlinacak = alinacaklarReposit.GetAll().Sum(x => x.BorcMiktari);
            var tahsilEdilen = odenmisBorclarReposit.GetAll().Sum(x => x.OdenenMiktar);
            var kalanVerilecek = verileceklerReposit.GetAll().Sum(x => x.BorcMiktari);
            var verilmis = verilmisVerilecekReposit.GetAll().Sum(x => x.OdenenMiktar);

            return new DashboardDto
            {
                ToplamAlinacak = kalanAlinacak + tahsilEdilen,
                TahsilEdilen = tahsilEdilen,
                ToplamVerilecek = kalanVerilecek + verilmis,
                Verilmis = verilmis
            };
        }
    }
}