import { FormulaCloneDialogComponent } from './../../components/formula-clone-dialog/formula-clone-dialog.component';
import { of } from 'rxjs';
import { FormulaServiceMock } from './../../../core/mocks/formula.service.mock';
import { FormulaService } from '../../../core/services/formula/formula.service';
import { LegajoServiceMock } from '../../../core/mocks/legajo.service.mock';
import { LegajoService } from '../../../legajo/legajo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaListContainer } from './formula-list.container';
import { Router } from '@angular/router';
import { Formula } from 'src/app/core/models/formula.model';
import { MatDialog } from '@angular/material';

describe('FormulaListContainer', () => {
  let component: FormulaListContainer;
  let fixture: ComponentFixture<FormulaListContainer>;
  let formulaService: FormulaService;
  let router: Router;
  let dialog: MatDialog;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  const fakeFormulaItem: Formula = {
    name: 'Formula 1',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
    params: [],
    description: 'Esta es una formula',
    origin: '',
    type: '',
    scope: '',
    result: '',
    value: 1,
    valueid: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaListContainer ],
      imports: [
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LegajoService, useClass: LegajoServiceMock },
        { provide: FormulaService, useClass: FormulaServiceMock }
      ]
    })
    .compileComponents();

    formulaService = TestBed.get(FormulaService);
    router = TestBed.get(Router);
    dialog = TestBed.get(MatDialog);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('should fetch formulas from FormulaService', async () => {
      const formulasStoreSpy = spyOn(formulaService.formulasStore$, 'subscribe');

      await component.ngAfterViewInit();

      expect(formulasStoreSpy).toHaveBeenCalledTimes(1);
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

      component.editFormula(fakeFormulaItem);

      expect(routerSpy).toHaveBeenCalledWith(['/formulas/edit', fakeFormulaItem.name]);
    });
  });

  describe('onDelete', () => {
    it('should delete the formula from the source', async () => {
      const deleteSpy = spyOn(formulaService, 'delete');

      await component.onDelete(fakeFormulaItem);

      expect(deleteSpy).toHaveBeenCalledWith(fakeFormulaItem.name);
    });

    it('should call removeItemFromTable', async () => {
      const deleteSpy = spyOn(component, 'removeItemFromTable');

      await component.onDelete(fakeFormulaItem);

      expect(deleteSpy).toHaveBeenCalledWith(fakeFormulaItem);
    });
  });

  describe('cloneFormula', () => {
    it('should open a dialog to handle the clone feature', () => {
      const dialogSpy = spyOn(component.dialog, 'open').and.returnValue(dialogRefSpyObj);

      component.cloneFormula(fakeFormulaItem);

      expect(dialogSpy).toHaveBeenCalledWith(
        FormulaCloneDialogComponent,
        {
          width: '500px',
          data: { formula: fakeFormulaItem }
        }
      );
    });
  });
});
