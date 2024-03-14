import { TestBed } from '@angular/core/testing';

import { MultisigService } from './multisig.service';
import { MultisigFirebaseService } from './multisig-firebase.service';
import { provideFirebase } from '@web/app/app.config';

describe('UserService', () => {
  let service: MultisigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultisigFirebaseService, provideFirebase()],
    });
    service = TestBed.inject(MultisigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
