import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFaIconComponent } from './base-fa-icon.component';

describe('FaBarsIconComponent', () => {
  let component: BaseFaIconComponent;
  let fixture: ComponentFixture<BaseFaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFaIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseFaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
