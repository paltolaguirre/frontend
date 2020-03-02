import { Formula } from 'src/app/core/models/formula.model';
import { Observable, of } from 'rxjs';
import { ApiHttpServiceMock } from './../../mocks/api-http.service.mock';
import { ApiHttpService } from './../api-http/api-http.service';
import { TestBed } from '@angular/core/testing';

import { FormulaService } from './formula.service';

describe('FormulaService', () => {
  let api: ApiHttpService;
  let service: FormulaService;
  const fakeFormula: Formula = {
    name: 'Formula 1',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
    params: [],
    description: 'Esta es una formula',
    origin: 'primitive',
    type: '',
    scope: '',
    result: '',
    value: 1,
    valueid: 1
  };

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

  describe('delete', () => {
    it('should call delete method from api service', async () => {
      const getSpy = spyOn(api, 'delete').and.returnValue(of(null));

      await service.delete(fakeFormula.name);

      expect(getSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas/${fakeFormula.name}`);
    });
  });

  describe('create', () => {
    it('should call post method from api service', async () => {
      const getSpy = spyOn(api, 'post').and.returnValue(of(null));

      await service.create(fakeFormula);

      expect(getSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas`, fakeFormula);
    });
  });

  describe('find', () => {
    it('should call get method from api service', async () => {
      const getSpy = spyOn(api, 'get').and.returnValue(of(null));

      await service.find(fakeFormula.name);

      expect(getSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas/${fakeFormula.name}`);
    });
  });

  describe('update', () => {
    it('should call put method from api service', async () => {
      const getSpy = spyOn(api, 'put').and.returnValue(of(null));

      await service.update(fakeFormula.name, fakeFormula);

      expect(getSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas/${fakeFormula.name}`, fakeFormula);
    });
  });

  describe('isEditable', () => {
    it('should return false if the origin is primitive', () => {
      expect(service.isEditable(fakeFormula)).toBeFalsy();
    });

    it('should return true in any case where the origin is not primitive', () => {
      fakeFormula.origin = 'any';

      expect(service.isEditable(fakeFormula)).toBeTruthy();
    });
  });
});
