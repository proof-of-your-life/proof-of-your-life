import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDialogComponent } from './base-dialog.component';

describe('BaseDialogComponent', () => {
  let component: BaseDialogComponent<unknown>;
  let fixture: ComponentFixture<BaseDialogComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseDialogComponent<unknown>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
