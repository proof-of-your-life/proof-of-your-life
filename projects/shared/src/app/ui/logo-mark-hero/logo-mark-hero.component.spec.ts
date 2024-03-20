import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMarkHeroComponent } from './logo-mark-hero.component';

describe('LogoMarkHeroComponent', () => {
  let component: LogoMarkHeroComponent;
  let fixture: ComponentFixture<LogoMarkHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoMarkHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoMarkHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
