import { FormulaServiceMock } from './../../../core/mocks/formula.service.mock';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { OperatorsService } from './../../../core/services/operators/operators.service';
import { SharedModule } from './../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsToolbarComponent } from './operators-toolbar.component';
import { MathOperatorTypes } from 'src/app/core/enums/math-operator-types.enum';
import { OperatorsFixtures } from 'src/app/core/fixtures/operators.fixtures';

describe('OperatorsToolbarComponent', () => {
  let component: OperatorsToolbarComponent;
  let fixture: ComponentFixture<OperatorsToolbarComponent>;
  let formulaService: FormulaService;
  let operatorService: OperatorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorsToolbarComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        OperatorsService,
        { provide: FormulaService, useClass: FormulaServiceMock }
      ]
    })
    .compileComponents();

    formulaService = TestBed.get(FormulaService);
    operatorService = TestBed.get(OperatorsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onOperatorSelected', () => {
    it('should emit formula item click event if the given operator is a formula operator', () => {
      spyOn(component, 'isFormulaOperator').and.returnValue(true);
      const formulaEmitterSpy = spyOn(formulaService, 'emitFormulaItemClick');

      component.onOperatorSelected(OperatorsFixtures.getFormulaOperator());

      expect(formulaEmitterSpy).toHaveBeenCalledWith({ payload: OperatorsFixtures.getFormulaOperator() });
    });

    it('should emit operator click event if the given value is an operator', () => {
      spyOn(component, 'isFormulaOperator').and.returnValue(false);
      const operatorEmitterSpy = spyOn(operatorService, 'emitOperatorClicked');

      component.onOperatorSelected(OperatorsFixtures.getMathOperator());

      expect(operatorEmitterSpy).toHaveBeenCalledWith({ payload: OperatorsFixtures.getMathOperator() });
    });
  });

  describe('isFormulaOperator', () => {
    it('should return true if the given operator has "valueid" key', () => {
      const operator = OperatorsFixtures.getFormulaOperator();

      expect(component.isFormulaOperator(operator)).toBeTruthy();
    });

    it('should return false if the given operator has not a "valueid" key', () => {
      const operator = OperatorsFixtures.getMathOperator();

      expect(component.isFormulaOperator(operator)).toBeFalsy();
    });
  });

  describe('getOperatorDefaultType', () => {
    it('should return the numeric type as default', () => {
      expect(component.getOperatorDefaultType()).toEqual(MathOperatorTypes.Numeric);
    });
  });

  describe('toogleMoreOperatorsVisibility', () => {
    it('should toggle the isMoreOperatorsListOpened state', () => {
      component.isMoreOperatorsListOpened = false;

      component.toogleMoreOperatorsVisibility();

      expect(component.isMoreOperatorsListOpened).toBeTruthy();

      component.toogleMoreOperatorsVisibility();

      expect(component.isMoreOperatorsListOpened).toBeFalsy();
    });
  });

  describe('closeMoreOperatorsList', () => {
    it('should set the isMoreOperatorsListOpened state to false', () => {
      component.isMoreOperatorsListOpened = true;

      component.closeMoreOperatorsList();

      expect(component.isMoreOperatorsListOpened).toBeFalsy();
    });
  });
});
