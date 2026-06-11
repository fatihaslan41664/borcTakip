export interface Alinacak {
  id: string;
  isim: string;
  borcMiktari: number;
  borcunVerildiğiTarih: string;
}

export interface Verilecek {
  id: string;
  isim: string;
  borcMiktari: number;
  borcunVerildigiTarih: string;
}

export interface OdenmisBorc {
  id: string;
  alinacaklarId: string;
  isim: string;
  odenenMiktar: number;
  toplamBorc: number;
  odemeTarihi: string;
}

export interface VerilmisVerilecek {
  id: string;
  verileceklerId: string;
  isim: string;
  odenenMiktar: number;
  toplamVerilecek: number;
  odemeTarihi: string;
}

export interface DashboardDto {
  toplamAlinacak: number;
  tahsilEdilen: number;
  toplamVerilecek: number;
  verilmis: number;
}
