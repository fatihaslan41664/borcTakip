import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinacaklarComponent } from './alinacaklar.component';

describe('AlinacaklarComponent', () => {
  let component: AlinacaklarComponent;
  let fixture: ComponentFixture<AlinacaklarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlinacaklarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlinacaklarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
