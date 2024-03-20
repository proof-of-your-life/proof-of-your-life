import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@web/app/app.routes';
import { provideFirebase } from '@web/app/app.config';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMenuComponent],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideFirebase(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
