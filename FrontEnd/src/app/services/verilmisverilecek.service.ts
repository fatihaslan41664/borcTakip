import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class VerilmisVerilecekService {
  constructor(private clientService: ClientService) {}

  GetAll(): Observable<any[]> {
    return this.clientService.get<any[]>({ controller: 'VerilmisVerilecekler', action: 'Listele' });
  }

  Sil(id: string): Observable<any> {
    return this.clientService.delete({ controller: 'VerilmisVerilecekler' }, id);
  }
}