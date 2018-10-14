import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCompComponent } from './nav-bar-comp.component';

describe('NavBarCompComponent', () => {
  let component: NavBarCompComponent;
  let fixture: ComponentFixture<NavBarCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
