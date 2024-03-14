import { TestBed } from '@angular/core/testing';

import { UserFirebaseService } from './user-firebase.service';
import { provideFirebase } from '@web/app/app.config';

describe('UserFirebaseService', () => {
  let service: UserFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideFirebase()],
    });
    service = TestBed.inject(UserFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
