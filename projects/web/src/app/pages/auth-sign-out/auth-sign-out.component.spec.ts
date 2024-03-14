import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignOutComponent } from './auth-sign-out.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@web/app/app.routes';
import { provideFirebase } from '@web/app/app.config';

describe('AuthSignOutComponent', () => {
  let component: AuthSignOutComponent;
  let fixture: ComponentFixture<AuthSignOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSignOutComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideFirebase(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
