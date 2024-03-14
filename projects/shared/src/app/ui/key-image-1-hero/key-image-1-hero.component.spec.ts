import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyImage1HeroComponent } from './key-image-1-hero.component';

describe('KeyImage1HeroComponent', () => {
  let component: KeyImage1HeroComponent;
  let fixture: ComponentFixture<KeyImage1HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyImage1HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyImage1HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
