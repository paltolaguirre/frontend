import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-table-row-actions',
  templateUrl: './common-table-row-actions.component.html',
  styleUrls: ['./common-table-row-actions.component.scss']
})
export class CommonTableRowActionsComponent implements OnInit {
  @Output() editEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onEditClick() {
    this.editEmitter.emit();
  }

  public onDeleteClick() {
    this.deleteEmitter.emit();
  }
}
