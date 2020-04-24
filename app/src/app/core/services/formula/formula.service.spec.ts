import { FormulaCategory } from './../../models/formula-category.model';
import { FormulaFixtures } from './../../fixtures/formulas.fixtures';
import { Formula } from 'src/app/core/models/formula.model';
import { Observable, of } from 'rxjs';
import { ApiHttpServiceMock } from './../../mocks/api-http.service.mock';
import { ApiHttpService } from './../api-http/api-http.service';
import { TestBed } from '@angular/core/testing';

import { FormulaService } from './formula.service';
import { FormulaTypes } from '../../constants/formula-types.constants';

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

  const formulas = FormulaFixtures.getAll();

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

  describe('updateFormulasStore', () => {
    it('should call getAll to retreive the latest formulas from the backend', async () => {
      const getAllSpy = spyOn(service, 'getAll').and.callThrough();

      await service.updateFormulasStore();

      expect(getAllSpy).toHaveBeenCalledTimes(1);
    });

    it('should update the store', async () => {
      const storeSpy = spyOn(service.formulas, 'next');

      await service.updateFormulasStore();

      expect(storeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getByType', () => {
    it('should call to the api with the right url', async () => {
      const apiGetSpy = spyOn(api, 'get').and.callThrough();
      const fakeType = 'test';

      await service.getByType(fakeType);

      expect(apiGetSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas?type=${fakeType}`);
    });
  });

  describe('delete', () => {
    it('should call delete method from api service', async () => {
      const getSpy = spyOn(api, 'delete').and.returnValue(of(null));

      await service.delete(fakeFormula.name);

      expect(getSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas/${fakeFormula.name}`);
    });

    it('should update the store', async () => {
      spyOn(api, 'delete').and.returnValue(of(null));
      const updateFormulasStoreSpy = spyOn(service, 'updateFormulasStore').and.returnValue(null);

      await service.delete(fakeFormula.name);

      expect(updateFormulasStoreSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should call post method from api service', async () => {
      const getSpy = spyOn(api, 'post').and.returnValue(of(null));

      await service.create(fakeFormula);

      expect(getSpy).toHaveBeenCalledWith(`${service.BASE_URL}/formulas`, fakeFormula);
    });

    it('should update the store', async () => {
      spyOn(api, 'post').and.returnValue(of(null));
      const updateFormulasStoreSpy = spyOn(service, 'updateFormulasStore').and.returnValue(null);

      await service.create(fakeFormula);

      expect(updateFormulasStoreSpy).toHaveBeenCalledTimes(1);
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

    it('should update the store', async () => {
      spyOn(api, 'put').and.returnValue(of(null));
      const updateFormulasStoreSpy = spyOn(service, 'updateFormulasStore').and.returnValue(null);

      await service.update(fakeFormula.name, fakeFormula);

      expect(updateFormulasStoreSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFormulaCategories', () => {
    it('should get the correct categories', () => {
      const expectedCategories: FormulaCategory[] = FormulaFixtures.getFormulaCategories();

      expect(service.getFormulaCategories()).toEqual(expectedCategories);
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

  describe('extractBasicMathOperators', () => {
    it('should correctly filter the math operators', () => {
      const fakeFormulaList = FormulaFixtures.getAll();

      expect(service.extractBasicMathOperators(fakeFormulaList)).toEqual(FormulaFixtures.getMathBasicOperators());
    });
  });

  describe('extractLogicalOperators', () => {
    it('should correctly filter the logical operators', () => {
      const fakeFormulaList = FormulaFixtures.getAll();

      expect(service.extractLogicalOperators(fakeFormulaList)).toEqual(FormulaFixtures.getLogialOperators());
    });
  });

  describe('extractFormulasByType', () => {
    it('should correctly filter formulas by a given type', () => {
      const fakeFormulaList = FormulaFixtures.getAll();

      expect(service.extractFormulasByType(fakeFormulaList, FormulaTypes.HELPER)).toEqual(FormulaFixtures.getHelperFormulas());
    });
  });

  describe('extractUserFormulas', () => {
    it('should correctly filter user formulas' , () => {
      const fakeFormulaList = FormulaFixtures.getAll();

      expect(service.extractUserFormulas(fakeFormulaList)).toEqual(FormulaFixtures.getUserFormulas());
    });
  });

  describe('extractVariables', () => {
    it('should correctly filter the variables', () => {
      const fakeFormulaList = FormulaFixtures.getAll();

      expect(service.extractVariables(fakeFormulaList)).toEqual(FormulaFixtures.getVariables());
    });
  });

  describe('extractInputParams', () => {
    it('should extract the input params from a given formula', () => {
      const formula = FormulaFixtures.getSumFormula();
      const expectedParams = FormulaFixtures.getSumInputParams();

      expect(service.extractInputParams(formula)).toEqual(expectedParams);
    });
  });

  describe('extractStandardFormulas', () => {
    it('should filter correctly the standard formulas', () => {
      const fakeFormulaList = FormulaFixtures.getAll();

      expect(service.extractStandardFormulas(fakeFormulaList)).toEqual(FormulaFixtures.getStandardFormulas());
    });
  });

  describe('emitFormulaItemClick', () => {
    it('should call the emit method from formulaPickerItemEmitter', () => {
      const data = {
        nodeId: '',
        payload: {}
      };

      const emitterSpy = spyOn(service.formulaPickerItemEmitter, 'emit').and.returnValue(null);

      service.emitFormulaItemClick(data);

      expect(emitterSpy).toHaveBeenCalledWith(data);
    });
  });
});
