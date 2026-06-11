import { Routes } from '@angular/router';
import { AlinacaklarComponent } from './components/alinacaklar/alinacaklar.component';
import { VerileceklerComponent } from './components/verilecekler/verilecekler.component';
import { AlinmisalinacaklarComponent } from './components/alinmisalinacaklar/alinmisalinacaklar.component';
import { HomeComponent } from './components/home/home.component';
import { VerilmisverileceklerComponent } from './components/verilmisverilecekler/verilmisverilecekler.component';


export const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'alinacaklar', component: AlinacaklarComponent },
    { path: 'verilecekler', component: VerileceklerComponent },
    { path: 'alinmis-alinacaklar', component: AlinmisalinacaklarComponent },
    { path: 'verilmis-verilecekler', component: VerilmisverileceklerComponent }

];