import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OdenmisBorc } from '../../models/models';
import { AlinmisAlinacakService } from '../../services/alinmisalinacak.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alinmisalinacaklar',
  imports: [CommonModule, FormsModule],
  templateUrl: './alinmisalinacaklar.component.html',
  styleUrl: './alinmisalinacaklar.component.css'
})
export class AlinmisalinacaklarComponent implements OnInit {
  liste: OdenmisBorc[] = [];
  filtrelenmis: OdenmisBorc[] = [];
  aramaMetni = '';
  sayfaBasiKayit = 10;
  mevcutSayfa = 1;
  silModalAcik = false;
  silinecekId = '';

  constructor(
    private alinmisAlinacakService: AlinmisAlinacakService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.alinmisAlinacakService.GetAll().subscribe((data: OdenmisBorc[]) => {
      this.liste = data; this.filtrelenmis = data;
    });
  }

  tamamenOdendi(item: OdenmisBorc) { return item.odenenMiktar >= item.toplamBorc; }
  silAc(id: string) { this.silinecekId = id; this.silModalAcik = true; }
  silModalKapat() { this.silModalAcik = false; this.silinecekId = ''; }

  silOnayla() {
    this.alinmisAlinacakService.Sil(this.silinecekId).subscribe(() => {
      this.toastr.error('Kayıt silindi.', 'Silindi');
      this.silModalKapat(); this.ngOnInit();
    });
  }

  ara() { this.filtrelenmis = this.liste.filter(x => x.isim.toLowerCase().includes(this.aramaMetni.toLowerCase())); this.mevcutSayfa = 1; }
  get toplamSayfa() { return Math.max(1, Math.ceil(this.filtrelenmis.length / this.sayfaBasiKayit)); }
  get sayfadakiKayitlar() { const b = (this.mevcutSayfa - 1) * this.sayfaBasiKayit; return this.filtrelenmis.slice(b, b + this.sayfaBasiKayit); }
  sayfalar() { return Array.from({ length: this.toplamSayfa }, (_, i) => i + 1); }
  sayfaDegistir(s: number) { if (s >= 1 && s <= this.toplamSayfa) this.mevcutSayfa = s; }
  initials(isim: string) { return isim.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(); }
}