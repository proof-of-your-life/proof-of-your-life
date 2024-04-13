import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifiedCommercialTransactionActComponent } from './specified-commercial-transaction-act.component';

describe('SpecifiedCommercialTransactionActComponent', () => {
  let component: SpecifiedCommercialTransactionActComponent;
  let fixture: ComponentFixture<SpecifiedCommercialTransactionActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecifiedCommercialTransactionActComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      SpecifiedCommercialTransactionActComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
