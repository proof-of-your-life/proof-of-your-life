import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaTwitterIconComponent } from './fa-twitter-icon.component';

describe('FaTwitterIconComponent', () => {
  let component: FaTwitterIconComponent;
  let fixture: ComponentFixture<FaTwitterIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaTwitterIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaTwitterIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
