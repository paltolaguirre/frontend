import { TrashComponent } from './../trash/trash.component';
import { FormsModule } from '@angular/forms';
import { FormulaDrawComponent } from './../formula-draw/formula-draw.component';
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
      declarations: [ FormulaDropSpaceComponent, FormulaDrawComponent, TrashComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule
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

  describe('onDrop', () => {
    it('should stop being executed if the formula cannot be edited', () => {
      const event = new Event('ondrop');
      spyOn(component, 'isAbleToEdit').and.returnValue(false);

      expect(component.onDrop(event)).toBeNull();
    });
  });
});
