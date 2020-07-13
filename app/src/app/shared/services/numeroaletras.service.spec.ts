import { TestBed } from '@angular/core/testing';

import { NumeroaletrasService } from './numeroaletras.service';

describe('NumeroaletrasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumeroaletrasService = TestBed.get(NumeroaletrasService);
    expect(service).toBeTruthy();
  });
});
