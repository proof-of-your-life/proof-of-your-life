import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaGoogleIconComponent } from './fa-google-icon.component';

describe('FaGoogleIconComponent', () => {
  let component: FaGoogleIconComponent;
  let fixture: ComponentFixture<FaGoogleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaGoogleIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaGoogleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
