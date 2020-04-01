import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { OperatorsService } from './../../../core/services/operators/operators.service';
import { FormulaServiceMock } from './../../../core/mocks/formula.service.mock';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaDropSpaceComponent } from './formula-drop-space.component';

describe('FormulaDropSpaceComponent', () => {
  let component: FormulaDropSpaceComponent;
  let fixture: ComponentFixture<FormulaDropSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaDropSpaceComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: FormulaService, useClass: FormulaServiceMock },
        { provide: OperatorsService, useClass: class {} },
        MatDialog,
        OperatorsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaDropSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
