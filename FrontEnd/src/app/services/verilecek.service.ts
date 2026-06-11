import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class VerilecekService {
  constructor(private clientService: ClientService) {}

  GetAll(): Observable<any[]> {
    return this.clientService.get<any[]>({ controller: 'Verilecekler', action: 'Listele' });
  }

  Ekle(isim: string, borcMiktari: number, tarih: Date): Observable<any> {
    return this.clientService.post({
      controller: 'Verilecekler', action: 'Ekle',
      queryString: `isim=${isim}&BorcMiktari=${borcMiktari}&tarih=${tarih.toISOString()}`
    }, {});
  }

  Sil(id: string): Observable<any> {
    return this.clientService.delete({ controller: 'Verilecekler' }, id);
  }

  BorcOde(verileceklerId: string, odenenMiktar: number, hepsiniOde: boolean = false): Observable<any> {
    return this.clientService.post({
      controller: 'Verilecekler', action: 'BorcOde',
      queryString: `verileceklerId=${verileceklerId}&odenenMiktar=${odenenMiktar}&hepsiniOde=${hepsiniOde}`
    }, {});
  }
}