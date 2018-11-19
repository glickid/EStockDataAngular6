import { TestBed } from '@angular/core/testing';

import { CryptoCurrencyService } from './crypto-currency.service';

describe('CryptoCurrencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoCurrencyService = TestBed.get(CryptoCurrencyService);
    expect(service).toBeTruthy();
  });
});
