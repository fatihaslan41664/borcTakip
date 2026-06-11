import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alinacak } from '../../models/models';
import { AlinacakService } from '../../services/alinacak.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alinacaklar',
  imports: [CommonModule, FormsModule],
  templateUrl: './alinacaklar.component.html',
  styleUrl: './alinacaklar.component.css'
})
export class AlinacaklarComponent implements OnInit {
  liste: Alinacak[] = [];
  filtrelenmis: Alinacak[] = [];
  aramaMetni = '';
  sayfaBasiKayit = 10;
  mevcutSayfa = 1;
  modalAcik = false;
  yeniKayit = { isim: '', borcMiktari: 0, tarih: '' };
  silModalAcik = false;
  silinecekId = '';
  borcOdeModalAcik = false;
  seciliKayit: Alinacak | null = null;
  odenenMiktar = 0;

  constructor(
    private alinacakService: AlinacakService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.alinacakService.GetAll().subscribe((data: Alinacak[]) => {
      this.liste = data;
      this.filtrelenmis = data;
    });
  }

  borcOdeAc(item: Alinacak) { this.seciliKayit = item; this.odenenMiktar = 0; this.borcOdeModalAcik = true; }
  borcOdeKapat() { this.borcOdeModalAcik = false; this.seciliKayit = null; this.odenenMiktar = 0; }

  borcOde(hepsiniOde: boolean = false) {
    if (!this.seciliKayit) return;
    if (!hepsiniOde && !this.odenenMiktar) { this.toastr.warning('Lütfen bir miktar girin.', 'Eksik bilgi'); return; }
    if (!hepsiniOde && this.odenenMiktar > this.seciliKayit.borcMiktari) {
      this.toastr.warning('Mevcut borçtan fazla ödeme yapılamaz.', 'Uyarı');
      this.odenenMiktar = this.seciliKayit.borcMiktari;
      return;
    }
    this.alinacakService.BorcOde(this.seciliKayit.id, this.odenenMiktar, hepsiniOde).subscribe(() => {
      this.toastr.success('Ödeme başarıyla kaydedildi.', 'Başarılı');
      this.borcOdeKapat();
      this.ngOnInit();
    });
  }

  silAc(id: string) { this.silinecekId = id; this.silModalAcik = true; }
  silModalKapat() { this.silModalAcik = false; this.silinecekId = ''; }

  silOnayla() {
    this.alinacakService.Sil(this.silinecekId).subscribe(() => {
      this.toastr.error('Kayıt silindi.', 'Silindi');
      this.silModalKapat();
      this.ngOnInit();
    });
  }

  modalAc() { this.yeniKayit = { isim: '', borcMiktari: 0, tarih: '' }; this.modalAcik = true; }
  modalKapat() { this.modalAcik = false; }

  kaydet() {
    if (!this.yeniKayit.isim || !this.yeniKayit.borcMiktari) { this.toastr.warning('Lütfen tüm alanları doldurun.', 'Eksik bilgi'); return; }
    const tarih = this.yeniKayit.tarih ? new Date(this.yeniKayit.tarih) : new Date();
    this.alinacakService.Ekle(this.yeniKayit.isim, this.yeniKayit.borcMiktari, tarih).subscribe(() => {
      this.toastr.success('Kayıt başarıyla eklendi.', 'Başarılı');
      this.modalKapat();
      this.ngOnInit();
    });
  }

  ara() { this.filtrelenmis = this.liste.filter(x => x.isim.toLowerCase().includes(this.aramaMetni.toLowerCase())); this.mevcutSayfa = 1; }
  get toplamSayfa() { return Math.max(1, Math.ceil(this.filtrelenmis.length / this.sayfaBasiKayit)); }
  get sayfadakiKayitlar() { const b = (this.mevcutSayfa - 1) * this.sayfaBasiKayit; return this.filtrelenmis.slice(b, b + this.sayfaBasiKayit); }
  sayfalar() { return Array.from({ length: this.toplamSayfa }, (_, i) => i + 1); }
  sayfaDegistir(s: number) { if (s >= 1 && s <= this.toplamSayfa) this.mevcutSayfa = s; }
  initials(isim: string) { return isim.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(); }
}