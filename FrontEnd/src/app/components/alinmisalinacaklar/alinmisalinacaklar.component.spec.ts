import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinmisalinacaklarComponent } from './alinmisalinacaklar.component';

describe('AlinmisalinacaklarComponent', () => {
  let component: AlinmisalinacaklarComponent;
  let fixture: ComponentFixture<AlinmisalinacaklarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlinmisalinacaklarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlinmisalinacaklarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
