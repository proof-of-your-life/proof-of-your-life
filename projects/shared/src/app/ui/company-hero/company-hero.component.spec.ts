import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHeroComponent } from './company-hero.component';

describe('CompanyHeroComponent', () => {
  let component: CompanyHeroComponent;
  let fixture: ComponentFixture<CompanyHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
