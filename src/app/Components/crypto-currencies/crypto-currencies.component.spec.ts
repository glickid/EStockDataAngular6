import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCurrenciesComponent } from './crypto-currencies.component';

describe('CryptoCurrenciesComponent', () => {
  let component: CryptoCurrenciesComponent;
  let fixture: ComponentFixture<CryptoCurrenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoCurrenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
