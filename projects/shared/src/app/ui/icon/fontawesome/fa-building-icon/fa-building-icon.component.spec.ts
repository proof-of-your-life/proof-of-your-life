import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaBuildingIconComponent } from './fa-building-icon.component';

describe('FaBuildingIconComponent', () => {
  let component: FaBuildingIconComponent;
  let fixture: ComponentFixture<FaBuildingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaBuildingIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaBuildingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
