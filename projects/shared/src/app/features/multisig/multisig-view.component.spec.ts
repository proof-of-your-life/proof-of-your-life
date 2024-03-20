import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultisigViewComponent } from './multisig-view.component';

describe('MultisigViewComponent', () => {
  let component: MultisigViewComponent;
  let fixture: ComponentFixture<MultisigViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultisigViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultisigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
