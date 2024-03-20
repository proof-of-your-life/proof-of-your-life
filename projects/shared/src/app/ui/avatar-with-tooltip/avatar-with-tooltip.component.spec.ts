import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarWithTooltipComponent } from './avatar-with-tooltip.component';

describe('AvatarWithTooltipComponent', () => {
  let component: AvatarWithTooltipComponent;
  let fixture: ComponentFixture<AvatarWithTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarWithTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarWithTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
