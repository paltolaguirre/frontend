import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Element {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {
  toppings = new FormControl();
  @Input() elements: String[] = [];

  constructor() { }

  ngOnInit() {}

}
