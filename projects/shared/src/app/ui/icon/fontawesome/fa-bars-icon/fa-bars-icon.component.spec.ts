import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaBarsIconComponent } from './fa-bars-icon.component';

describe('FaBarsIconComponent', () => {
  let component: FaBarsIconComponent;
  let fixture: ComponentFixture<FaBarsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaBarsIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaBarsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
