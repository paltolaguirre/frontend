import { PrintService } from 'src/app/print/print.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-top-menu-toolbar',
  templateUrl: './common-top-menu-toolbar.component.html',
  styleUrls: ['./common-top-menu-toolbar.component.scss']
})
export class CommonTopMenuToolbarComponent implements OnInit {
  @Input() newResourceUrl: string;
  @Input() subCollection?: string | string[];

  constructor(private printService: PrintService) { }

  ngOnInit() {
  }

  public onPrintButtonClick() {
    this.printService.printTOPDF();
  }

  public doFilter(event) {
    console.log(event.target.value);
  }

}
