import { TestBed } from '@angular/core/testing';

import { SignupStorageService } from './signup-storage.service';

describe('SignupStorageService', () => {
  let service: SignupStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
