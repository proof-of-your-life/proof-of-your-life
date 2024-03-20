import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithGoogleButtonComponent } from './sign-in-with-google-button.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@web/app/app.routes';
import { provideFirebase } from '@web/app/app.config';

describe('SignInWithGoogleButtonComponent', () => {
  let component: SignInWithGoogleButtonComponent;
  let fixture: ComponentFixture<SignInWithGoogleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInWithGoogleButtonComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideFirebase(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInWithGoogleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
