import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaUserLockIconComponent } from './fa-user-lock-icon.component';

describe('FaUserLockIconComponent', () => {
  let component: FaUserLockIconComponent;
  let fixture: ComponentFixture<FaUserLockIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaUserLockIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaUserLockIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
