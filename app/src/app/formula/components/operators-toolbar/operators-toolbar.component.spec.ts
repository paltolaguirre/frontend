import { FormulaServiceMock } from './../../../core/mocks/formula.service.mock';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { OperatorsService } from './../../../core/services/operators/operators.service';
import { SharedModule } from './../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsToolbarComponent } from './operators-toolbar.component';
import { MathOperatorTypes } from 'src/app/core/enums/math-operator-types.enum';

describe('OperatorsToolbarComponent', () => {
  let component: OperatorsToolbarComponent;
  let fixture: ComponentFixture<OperatorsToolbarComponent>;

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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
