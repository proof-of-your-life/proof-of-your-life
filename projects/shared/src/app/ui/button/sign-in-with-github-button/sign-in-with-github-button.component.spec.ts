import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithGithubButtonComponent } from './sign-in-with-github-button.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@web/app/app.routes';
import { provideFirebase } from '@web/app/app.config';

describe('SignInWithGithubButtonComponent', () => {
  let component: SignInWithGithubButtonComponent;
  let fixture: ComponentFixture<SignInWithGithubButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInWithGithubButtonComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideFirebase(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInWithGithubButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
