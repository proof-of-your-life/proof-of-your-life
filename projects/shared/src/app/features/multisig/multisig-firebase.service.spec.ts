import { TestBed } from '@angular/core/testing';

import { MultisigFirebaseService } from './multisig-firebase.service';
import { provideFirebase } from '@web/app/app.config';

describe('UserFirebaseService', () => {
  let service: MultisigFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideFirebase()],
    });
    service = TestBed.inject(MultisigFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
