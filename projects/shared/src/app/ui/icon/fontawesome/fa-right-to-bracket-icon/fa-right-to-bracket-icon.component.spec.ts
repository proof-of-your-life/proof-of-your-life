import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaRightToBracketIconComponent } from './fa-right-to-bracket-icon.component';

describe('FaRightToBracketIconComponent', () => {
  let component: FaRightToBracketIconComponent;
  let fixture: ComponentFixture<FaRightToBracketIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaRightToBracketIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaRightToBracketIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
