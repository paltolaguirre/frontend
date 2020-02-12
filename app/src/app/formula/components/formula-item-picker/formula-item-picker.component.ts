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

  constructor(private formulaService: FormulaService) {}

  ngOnInit() {
    this.categories = this.formulaService.getFormulaCategories();
  }

  public onExpandClick() {
    this.isExpanded = !this.isExpanded;

    this.expandedStateEmitter.emit(this.isExpanded);
  }
}
