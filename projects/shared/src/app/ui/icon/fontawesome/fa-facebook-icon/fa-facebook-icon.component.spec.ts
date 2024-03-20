import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaFacebookIconComponent } from './fa-facebook-icon.component';

describe('FaFacebookIconComponent', () => {
  let component: FaFacebookIconComponent;
  let fixture: ComponentFixture<FaFacebookIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaFacebookIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaFacebookIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
