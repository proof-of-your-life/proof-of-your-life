import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaGithubIconComponent } from './fa-github-icon.component';

describe('FaGithubIconComponent', () => {
  let component: FaGithubIconComponent;
  let fixture: ComponentFixture<FaGithubIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaGithubIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaGithubIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
