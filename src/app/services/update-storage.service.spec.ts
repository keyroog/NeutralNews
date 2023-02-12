import { TestBed } from '@angular/core/testing';

import { UpdateStorageService } from './update-storage.service';

describe('UpdateStorageService', () => {
  let service: UpdateStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
