import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaListIconComponent } from './fa-list-icon.component';

describe('FaListIconComponent', () => {
  let component: FaListIconComponent;
  let fixture: ComponentFixture<FaListIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaListIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
