import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithTwitterButtonComponent } from './sign-in-with-twitter-button.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@web/app/app.routes';
import { provideFirebase } from '@web/app/app.config';

describe('SignInWithTwitterButtonComponent', () => {
  let component: SignInWithTwitterButtonComponent;
  let fixture: ComponentFixture<SignInWithTwitterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInWithTwitterButtonComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideFirebase(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInWithTwitterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
