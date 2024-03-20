import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyImage3HeroComponent } from './key-image-3-hero.component';

describe('KeyImage3HeroComponent', () => {
  let component: KeyImage3HeroComponent;
  let fixture: ComponentFixture<KeyImage3HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyImage3HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyImage3HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
