import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignInComponent } from './auth-sign-in.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@web/app/app.routes';
import { provideFirebase } from '@web/app/app.config';

describe('AuthSignInComponent', () => {
  let component: AuthSignInComponent;
  let fixture: ComponentFixture<AuthSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSignInComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideFirebase(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
