import { TestBed } from '@angular/core/testing';

import { LoginStorageService } from './login-storage.service';

describe('LoginStorageService', () => {
  let service: LoginStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
