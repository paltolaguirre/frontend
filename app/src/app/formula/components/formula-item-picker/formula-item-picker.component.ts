import { MathOperatorTypes } from './../../../core/enums/math-operator-types.enum';
import { FormulaTransferData } from './../../../core/models/formula-transfer-data.model';
import { FormulaParam } from './../../../core/models/formula-param.model';
import { Concepto } from './../../../concepto/concepto.model';
import { ConceptoService } from './../../../concepto/concepto.service';
import { Formula } from './../../../core/models/formula.model';
import { FormulaCategoryItemTypes } from './../../../core/enums/formula-category-item-types.enum';
import { FormulaCategoryItem } from './../../../core/models/formula-category-item.model';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { FormulaCategory } from './../../../core/models/formula-category.model';
import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-formula-item-picker',
  templateUrl: './formula-item-picker.component.html',
  styleUrls: ['./formula-item-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormulaItemPickerComponent implements OnInit {
  @Input()
  set currentFormulaInput(value) {
    if (value) {
      this.setInputParams(value);
    }
  }
  @Output() expandedStateEmitter: EventEmitter<boolean> = new EventEmitter();

  public isExpanded: boolean = true;
  public categories: FormulaCategory[];
  public selectedCategoryItem: FormulaCategoryItem;
  public formulas: Formula[];
  public userFormulas: Formula[];
  public variables: Formula[];
  public concepts: Concepto[];
  public inputParams: FormulaParam[];
  public currentFormula: Formula;
  public standardFormulas: Formula[];
  public searchInput: any;
  private pickableItems: any[] = [];
  public searchResult: any[] = [];

  constructor(
    private conceptService: ConceptoService,
    private formulaService: FormulaService
  ) {}

  ngOnInit() {
    this.setFormulaCategories();
    this.setDefaultCategoryItem();
    this.fetchFormulas();
    this.fetchConcepts();
  }
  
  public setFormulaCategories() {
    this.categories = this.formulaService.getFormulaCategories();
  }

  public setDefaultCategoryItem() {
    if (!this.categories) {
      return null;
    }

    this.selectedCategoryItem = this.categories[0].items[0];
  }

  public fetchFormulas() {
    this.formulaService.formulasStore$.subscribe((formulas: Formula[]) => {
      this.formulas = formulas;

      this.userFormulas = this.formulaService.extractUserFormulas(this.formulas);
      this.variables = this.formulaService.extractVariables(this.formulas);
      this.standardFormulas = this.formulaService.extractStandardFormulas(this.formulas);

      if (formulas) {
        this.addToPickableItems([...formulas, ...this.userFormulas, ...this.variables, ...this.standardFormulas]);
      }
    });
  }

  public setInputParams(formula: Formula) {
    this.inputParams = this.formulaService.extractInputParams(formula);

    this.addToPickableItems(this.inputParams);
  }

  public async fetchConcepts() {
    this.concepts = await this.conceptService.getAll();

    this.addToPickableItems(this.concepts);
  }

  public onExpandClick() {
    this.isExpanded = !this.isExpanded;

    this.expandedStateEmitter.emit(this.isExpanded);
  }

  public onCategoryItemClick(item: FormulaCategoryItem) {
    this.selectedCategoryItem = item;
  }

  public isSearchItemSelected(item: FormulaCategoryItem): boolean {
    return item.slug === FormulaCategoryItemTypes.Search;
  }

  public onDragStart(event, formulaItem: any) {
    const data: FormulaTransferData = {
      nodeId: event.target.id,
      payload: formulaItem
    };

    event.dataTransfer.setData('text/plain', JSON.stringify(data));
  }

  public onFormulaItemClick(event, formulaItem: any) {
    const data: FormulaTransferData = {
      nodeId: event.target.id,
      payload: formulaItem
    };

    this.formulaService.emitFormulaItemClick(data);
  }

  public getFormulaTransferData(formula: Formula, nodeId: string): FormulaTransferData {
    return {
      nodeId,
      payload: formula
    };
  }

  public getOperatorDefaultType() {
    return MathOperatorTypes.Numeric;
  }

  private addToPickableItems(items: any[]) {
    this.pickableItems = [...this.pickableItems, ...items];

    // Filter valid items.
    this.pickableItems = this.pickableItems.filter((item) => {
      return !!item && !Array.isArray(item);
    });
  }

  public doFilter() {
    if (!this.pickableItems) {
      return null;
    }

    const sanitizedSearchInput = this.searchInput.toLowerCase();

    this.searchResult = this.pickableItems.filter(item => {
      const sanitizedItemName = item.name ? item.name.toLowerCase() : item.nombre.toLowerCase();

      return sanitizedItemName.includes(sanitizedSearchInput);
    });
  }
}
