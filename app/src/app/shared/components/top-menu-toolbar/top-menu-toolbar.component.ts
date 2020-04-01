import { PrintService } from 'src/app/print/print.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-menu-toolbar',
  templateUrl: './top-menu-toolbar.component.html',
  styleUrls: ['./top-menu-toolbar.component.scss']
})
export class TopMenuToolbarComponent implements OnInit {
  @Output() filterEmitter: EventEmitter<string> = new EventEmitter();
  @Output() newResourceEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  public onNewButtonClick() {
    this.newResourceEmitter.emit();
  }

  public onPrintButtonClick() {
    this.printService.printTOPDF();
  }

  public doFilter(event) {
    this.filterEmitter.emit(event.target.value);
  }

}
