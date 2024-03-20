import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaMailBulkIconComponent } from './fa-mail-bulk-icon.component';

describe('FaMailBulkIconComponent', () => {
  let component: FaMailBulkIconComponent;
  let fixture: ComponentFixture<FaMailBulkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaMailBulkIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaMailBulkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
