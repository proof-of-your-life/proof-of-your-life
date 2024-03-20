import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersHeroComponent } from './members-hero.component';

describe('MembersHeroComponent', () => {
  let component: MembersHeroComponent;
  let fixture: ComponentFixture<MembersHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MembersHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
