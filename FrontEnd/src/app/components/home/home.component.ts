import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

interface DashboardDto {
  toplamAlinacak: number;
  tahsilEdilen: number;
  toplamVerilecek: number;
  verilmis: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewChecked {
  dashboard: DashboardDto | null = null;
  private donutsDrawn = false;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dashboardService.Get().subscribe(data => {
      this.dashboard = data;
      this.donutsDrawn = false;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewChecked() {
    if (this.dashboard && !this.donutsDrawn) {
      const svg1 = document.getElementById('donut1');
      const svg2 = document.getElementById('donut2');
      if (svg1 && svg2) { this.drawDonuts(); this.donutsDrawn = true; }
    }
  }

  get bekleyenAlinak() { return this.dashboard ? this.dashboard.toplamAlinacak - this.dashboard.tahsilEdilen : 0; }
  get bekleyenVer() { return this.dashboard ? this.dashboard.toplamVerilecek - this.dashboard.verilmis : 0; }
  get netFark() { return this.bekleyenAlinak - this.bekleyenVer; }
  get pct1() { return this.dashboard && this.dashboard.toplamAlinacak > 0 ? Math.round(this.dashboard.tahsilEdilen / this.dashboard.toplamAlinacak * 100) : 0; }
  get pct2() { return this.dashboard && this.dashboard.toplamVerilecek > 0 ? Math.round(this.dashboard.verilmis / this.dashboard.toplamVerilecek * 100) : 0; }

  fmt(n: number) { return '₺' + Math.round(n).toLocaleString('tr-TR'); }

  drawDonuts() {
    this.drawDonut('donut1', this.dashboard!.tahsilEdilen, this.dashboard!.toplamAlinacak, '#185FA5', '#B5D4F4');
    this.drawDonut('donut2', this.dashboard!.verilmis, this.dashboard!.toplamVerilecek, '#0F6E56', '#9FE1CB');
  }

  drawDonut(svgId: string, filled: number, total: number, colorFilled: string, colorEmpty: string) {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    const cx = 80, cy = 80, r = 64, stroke = 18;
    const circ = 2 * Math.PI * r;
    const dash = total > 0 ? (filled / total) * circ : 0;
    svg.innerHTML = `
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colorEmpty}" stroke-width="${stroke}" />
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colorFilled}" stroke-width="${stroke}"
        stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${circ * 0.25}"
        stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})" />`;
  }
}
