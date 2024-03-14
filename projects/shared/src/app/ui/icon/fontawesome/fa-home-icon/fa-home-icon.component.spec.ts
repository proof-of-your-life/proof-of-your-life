import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaHomeIconComponent } from './fa-home-icon.component';

describe('FaHomeIconComponent', () => {
  let component: FaHomeIconComponent;
  let fixture: ComponentFixture<FaHomeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaHomeIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaHomeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
