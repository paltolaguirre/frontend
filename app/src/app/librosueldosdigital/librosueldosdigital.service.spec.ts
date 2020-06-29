import { TestBed } from '@angular/core/testing';

import { LibrosueldosdigitalService } from './librosueldosdigital.service';

xdescribe('LibrosueldosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibrosueldosdigitalService = TestBed.get(LibrosueldosdigitalService);
    expect(service).toBeTruthy();
  });
});
