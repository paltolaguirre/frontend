import { PrintService } from './../../../print/print.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { emit } from 'cluster';

@Component({
  selector: 'app-bottom-table-actions',
  templateUrl: './bottom-table-actions.component.html',
  styleUrls: ['./bottom-table-actions.component.scss']
})
export class BottomTableActionsComponent implements OnInit {
  @Input() isNew: boolean;
  @Output() saveEmitter: EventEmitter<any> = new EventEmitter();
  @Output() abortEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  public onClickSave() {
    this.saveEmitter.emit();
  }

  public onClickAbort() {
    this.abortEmitter.emit();
  }

  public onPrintClick() {
    this.printService.printTOPDF();
  }
}
