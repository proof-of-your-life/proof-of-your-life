import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisigComponent } from './multisig.component';
import { MultisigService } from './multisig.service';
import { MultisigFirebaseService } from './multisig-firebase.service';
import { provideFirebase } from '@web/app/app.config';

describe('MultisigComponent', () => {
  let component: MultisigComponent;
  let fixture: ComponentFixture<MultisigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MultisigService, MultisigFirebaseService, provideFirebase()],
      imports: [MultisigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultisigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
