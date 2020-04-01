import { ConceptServiceMock } from './../../../core/mocks/concept.service.mock';
import { ConceptoService } from './../../../concepto/concepto.service';
import { SharedModule } from './../../../shared/shared.module';
import { FormulaServiceMock } from './../../../core/mocks/formula.service.mock';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { FormulaCategoryItem } from './../../../core/models/formula-category-item.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaItemPickerComponent } from './formula-item-picker.component';

describe('FormulaItemPickerComponent', () => {
  let component: FormulaItemPickerComponent;
  let fixture: ComponentFixture<FormulaItemPickerComponent>;
  let fakeCategoryItem: FormulaCategoryItem;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaItemPickerComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: FormulaService, useClass: FormulaServiceMock },
        { provide: ConceptoService, useClass: ConceptServiceMock }
      ]
    })
    .compileComponents();

    fakeCategoryItem = {
      id: 1,
      img: 'assets/img/descarga.jpg',
      title: 'Variables',
      categoryId: 1,
      slug: 'variables'
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaItemPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onExpandClick', () => {
    it('should toggle the isExpanded state', () => {
      component.isExpanded = false;

      component.onExpandClick();

      expect(component.isExpanded).toEqual(true);

      component.onExpandClick();

      expect(component.isExpanded).toEqual(false);
    });

    it('should emit the isExpanded value', () => {
      const emitterSpy = spyOn(component.expandedStateEmitter, 'emit');

      component.onExpandClick();

      expect(emitterSpy).toHaveBeenCalledWith(component.isExpanded);
    });
  });

  describe('onCategoryItemClick', () => {
    it('should set the received item as selectedCategoryItem', () => {
      component.onCategoryItemClick(fakeCategoryItem);

      expect(component.selectedCategoryItem).toEqual(fakeCategoryItem);
    });
  });
});
