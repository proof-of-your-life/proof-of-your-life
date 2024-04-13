import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaFileContractIconComponent } from './fa-file-contract-icon.component';

describe('FaFileContractIconComponent', () => {
  let component: FaFileContractIconComponent;
  let fixture: ComponentFixture<FaFileContractIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaFileContractIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaFileContractIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
