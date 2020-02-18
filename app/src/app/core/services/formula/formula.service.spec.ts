import { ApiHttpServiceMock } from './../../mocks/api-http.service.mock';
import { ApiHttpService } from './../api-http/api-http.service';
import { TestBed } from '@angular/core/testing';

import { FormulaService } from './formula.service';

describe('FormulaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: ApiHttpService, useClass: ApiHttpServiceMock }
    ]
  }));

  it('should be created', () => {
    const service: FormulaService = TestBed.get(FormulaService);
    expect(service).toBeTruthy();
  });
});
