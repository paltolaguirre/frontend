import { Observable, of } from 'rxjs';
import { ApiHttpServiceMock } from './../../mocks/api-http.service.mock';
import { ApiHttpService } from './../api-http/api-http.service';
import { TestBed } from '@angular/core/testing';

import { FormulaService } from './formula.service';

describe('FormulaService', () => {
  let api: ApiHttpService;
  let service: FormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiHttpService, useClass: ApiHttpServiceMock }
      ]
    });

    api = TestBed.get(ApiHttpService);
    service = TestBed.get(FormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should call get method from api service', async () => {
      const getSpy = spyOn(api, 'get').and.returnValue(of(null));

      await service.getAll();

      expect(getSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas`);
    });
  });
});
