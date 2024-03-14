import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaPlusIconComponent } from './fa-plus-icon.component';

describe('FaPlusIconComponent', () => {
  let component: FaPlusIconComponent;
  let fixture: ComponentFixture<FaPlusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaPlusIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaPlusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
