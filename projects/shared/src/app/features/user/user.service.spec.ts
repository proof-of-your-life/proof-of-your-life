import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { UserFirebaseService } from './user-firebase.service';
import { provideFirebase } from '@web/app/app.config';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFirebaseService, provideFirebase()],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
