import { PrintService } from 'src/app/print/print.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-top-menu-toolbar',
  templateUrl: './common-top-menu-toolbar.component.html',
  styleUrls: ['./common-top-menu-toolbar.component.scss']
})
export class CommonTopMenuToolbarComponent implements OnInit {
  @Input() newResourceUrl: string;
  @Input() subCollection?: string;
  @Output() filterEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  public onPrintButtonClick() {
    this.printService.printTOPDF();
  }

  public doFilter(event) {
    this.filterEmitter.emit(event.target.value);
  }

}
