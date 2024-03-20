import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaRightFromBracketIconComponent } from './fa-right-from-bracket-icon.component';

describe('FaRightFromBracketIconComponent', () => {
  let component: FaRightFromBracketIconComponent;
  let fixture: ComponentFixture<FaRightFromBracketIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaRightFromBracketIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaRightFromBracketIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
