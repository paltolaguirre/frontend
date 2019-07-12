import { TestBed } from '@angular/core/testing';

import { F931Service } from './f931.service';

describe('F931Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: F931Service = TestBed.get(F931Service);
    expect(service).toBeTruthy();
  });
});
