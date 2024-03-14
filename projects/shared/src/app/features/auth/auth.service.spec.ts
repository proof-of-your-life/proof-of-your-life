import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@web/app/app.routes';
import { provideFirebase } from '@web/app/app.config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideFirebase(),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
