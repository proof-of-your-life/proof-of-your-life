import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaGoogeIconComponent } from './fa-googe-icon.component';

describe('FaGoogeIconComponent', () => {
  let component: FaGoogeIconComponent;
  let fixture: ComponentFixture<FaGoogeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaGoogeIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FaGoogeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
