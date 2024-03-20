import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaUserPlusIconComponent } from './fa-user-plus-icon.component';

describe('FaUserPlusIconComponent', () => {
  let component: FaUserPlusIconComponent;
  let fixture: ComponentFixture<FaUserPlusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaUserPlusIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaUserPlusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
