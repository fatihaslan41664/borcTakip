import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerilmisverileceklerComponent } from './verilmisverilecekler.component';

describe('VerilmisverileceklerComponent', () => {
  let component: VerilmisverileceklerComponent;
  let fixture: ComponentFixture<VerilmisverileceklerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerilmisverileceklerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerilmisverileceklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
