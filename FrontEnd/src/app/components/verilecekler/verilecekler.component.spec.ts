import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerileceklerComponent } from './verilecekler.component';

describe('VerileceklerComponent', () => {
  let component: VerileceklerComponent;
  let fixture: ComponentFixture<VerileceklerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerileceklerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerileceklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
