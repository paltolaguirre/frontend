import { TestBed } from '@angular/core/testing';

import { LibrosueldosService } from './librosueldos.service';

xdescribe('LibrosueldosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LibrosueldosService = TestBed.get(LibrosueldosService);
    expect(service).toBeTruthy();
  });
});
