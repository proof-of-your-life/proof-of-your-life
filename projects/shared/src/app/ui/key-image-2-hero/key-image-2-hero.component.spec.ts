import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyImage2HeroComponent } from './key-image-2-hero.component';

describe('KeyImage2HeroComponent', () => {
  let component: KeyImage2HeroComponent;
  let fixture: ComponentFixture<KeyImage2HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyImage2HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyImage2HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
