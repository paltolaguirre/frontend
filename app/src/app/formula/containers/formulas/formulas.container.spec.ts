import { FormulaService } from './../../../core/services/formula/formula.service';
import { LegajoServiceMock } from './../../../core/mocks/legajo.service.mock';
import { LegajoService } from './../../../legajo/legajo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulasContainer } from './formulas.container';
import { Router } from '@angular/router';

describe('FormulasContainer', () => {
  let component: FormulasContainer;
  let fixture: ComponentFixture<FormulasContainer>;
  let formulaService: FormulaService;
  let router: Router;

  const fakeFormulaItem = {
    id: 1,
    name: 'Formula 1',
    description: 'Esta es una formula'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulasContainer ],
      imports: [
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LegajoService, useClass: LegajoServiceMock }
      ]
    })
    .compileComponents();

    formulaService = TestBed.get(FormulaService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulasContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('should fetch formulas from FormulaService', async () => {
      const getFormulasSpy = spyOn(formulaService, 'getAll');

      await component.ngAfterViewInit();

      expect(getFormulasSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createFormula', () => {
    it('should navigate to the formula create page', async () => {
      const routerSpy = spyOn(router, 'navigate');

      await component.createFormula();

      expect(routerSpy).toHaveBeenCalledWith(['/formulas/create']);
    });
  });

  describe('editFormula', () => {
    it('should navigate to the formula edition page', async () => {
      const routerSpy = spyOn(router, 'navigate');

      await component.editFormula(fakeFormulaItem);

      expect(routerSpy).toHaveBeenCalledWith(['/formulas/edit', fakeFormulaItem.id]);
    });
  });


  describe('onDelete', () => {
    it('should delete the formula from the source', async () => {
      const deleteSpy = spyOn(formulaService, 'delete');

      await component.onDelete(fakeFormulaItem);

      expect(deleteSpy).toHaveBeenCalledWith(fakeFormulaItem);
    });

    it('should call removeItemFromTable', async () => {
      const deleteSpy = spyOn(component, 'removeItemFromTable');

      await component.onDelete(fakeFormulaItem);

      expect(deleteSpy).toHaveBeenCalledWith(fakeFormulaItem);
    });
  });
});
