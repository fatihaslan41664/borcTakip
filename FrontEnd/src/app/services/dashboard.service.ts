import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private clientService: ClientService) {}

  Get(): Observable<any> {
    return this.clientService.get<any>({ controller: 'Dashboard' });
  }
}