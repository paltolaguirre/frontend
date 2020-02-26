import { FormulaCategoryItemTypes } from './../../../core/enums/formula-category-item-types.enum';
import { FormulaCategoryItem } from './../../../core/models/formula-category-item.model';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { FormulaCategory } from './../../../core/models/formula-category.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formula-item-picker',
  templateUrl: './formula-item-picker.component.html',
  styleUrls: ['./formula-item-picker.component.scss']
})
export class FormulaItemPickerComponent implements OnInit {
  @Output() expandedStateEmitter: EventEmitter<boolean> = new EventEmitter();

  public isExpanded: boolean = true;
  public categories: FormulaCategory[];
  public selectedCategoryItem: FormulaCategoryItem;

  constructor(private formulaService: FormulaService) {}

  ngOnInit() {
    this.setFormulaCategories();
    this.setDefaultCategoryItem();
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

  public onExpandClick() {
    this.isExpanded = !this.isExpanded;

    this.expandedStateEmitter.emit(this.isExpanded);
  }

  public onCategoryItemClick(item: FormulaCategoryItem) {
    console.log(item);
    this.selectedCategoryItem = item;
  }

  public isSearchItemSelected(item: FormulaCategoryItem): boolean {
    return item.slug === FormulaCategoryItemTypes.Search;
  }
}
