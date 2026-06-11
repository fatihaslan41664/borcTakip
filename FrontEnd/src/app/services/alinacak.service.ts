import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class AlinacakService {
  constructor(private clientService: ClientService) {}

  GetAll(): Observable<any[]> {
    return this.clientService.get<any[]>({ controller: 'Alinacaklar', action: 'Listele' });
  }

  Ekle(isim: string, borcMiktari: number, tarih: Date): Observable<any> {
    return this.clientService.post({
      controller: 'Alinacaklar', action: 'Ekle',
      queryString: `isim=${isim}&BorcMiktari=${borcMiktari}&tarih=${tarih.toISOString()}`
    }, {});
  }

  Sil(id: string): Observable<any> {
    return this.clientService.delete({ controller: 'Alinacaklar' }, id);
  }

  BorcOde(alinacaklarId: string, odenenMiktar: number, hepsiniOde: boolean = false): Observable<any> {
    return this.clientService.post({
      controller: 'Alinacaklar', action: 'BorcOde',
      queryString: `alinacaklarId=${alinacaklarId}&odenenMiktar=${odenenMiktar}&hepsiniOde=${hepsiniOde}`
    }, {});
  }
}