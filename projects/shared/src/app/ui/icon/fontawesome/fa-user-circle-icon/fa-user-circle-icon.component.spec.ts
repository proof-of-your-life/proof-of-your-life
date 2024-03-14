import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaUserCircleIconComponent } from './fa-user-circle-icon.component';

describe('FaUserCircleIconComponent', () => {
  let component: FaUserCircleIconComponent;
  let fixture: ComponentFixture<FaUserCircleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaUserCircleIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaUserCircleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
