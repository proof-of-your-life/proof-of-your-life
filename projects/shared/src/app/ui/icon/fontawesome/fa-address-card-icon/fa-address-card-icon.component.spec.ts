import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaAddressCardIconComponent } from './fa-address-card-icon.component';

describe('FaUserPlusIconComponent', () => {
  let component: FaAddressCardIconComponent;
  let fixture: ComponentFixture<FaAddressCardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaAddressCardIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaAddressCardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
