import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-table-row-actions',
  templateUrl: './table-row-actions.component.html',
  styleUrls: ['./table-row-actions.component.scss']
})
export class TableRowActionsComponent implements OnInit {
  @Input() isEditable: boolean;
  @Input() isClonable: boolean;
  @Output() editEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() viewEmitter: EventEmitter<any> = new EventEmitter();
  @Output() cloneEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onEditClick() {
    this.editEmitter.emit();
  }

  public onDeleteClick() {
    this.deleteEmitter.emit();
  }

  public onViewClick() {
    this.viewEmitter.emit();
  }

  public onCloneClick() {
    this.cloneEmitter.emit();
  }
}
