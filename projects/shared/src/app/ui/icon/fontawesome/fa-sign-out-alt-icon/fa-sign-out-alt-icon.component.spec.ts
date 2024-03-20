import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaSignOutAltIconComponent } from './fa-sign-out-alt-icon.component';

describe('FaSignOutAltIconComponent', () => {
  let component: FaSignOutAltIconComponent;
  let fixture: ComponentFixture<FaSignOutAltIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaSignOutAltIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaSignOutAltIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
