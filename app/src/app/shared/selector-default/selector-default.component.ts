import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { SelectorService } from './selector-default.service';
import { startWith, map } from 'rxjs/operators';
import { Options } from 'selenium-webdriver';
import { Models } from './selector-default.models';

export interface SelectorElement {
  ID: any;
  nombre: string;
  codigo?: string;
  descripcion?: string;
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string;
  activo?: Number
}

@Component({
  selector: 'app-selector-default',
  templateUrl: './selector-default.component.html',
  styleUrls: ['./selector-default.component.css']
})
export class SelectorDefaultComponent implements OnInit {
  @Input('placeholder') placeholder: string;
  @Input() value: SelectorElement;
  @Input('disabled') disabled: Boolean;
  @Input('type') tipo: string;
  @Input('nombre') nombre: string;
  @Input('matSelect') matSelect: string;
  @Input('required') required: Boolean;
  @Input('filter') filter: string;
  @Output() optionSelected = new EventEmitter();
  
  myControl = new FormControl();
  options: SelectorElement[];

  filteredOptions: Observable<SelectorElement[]>;

  constructor(private selectorService: SelectorService, public models: Models) { }
    
  async ngOnInit() {
    this.initialize();
  }
  
  public onSelectChangeEvent(event,data)
  {
    eval("data."+this.nombre + " = " + event);
    eval("data."+this.nombre + "ID = " + event.ID);
  }

 
  ngAfterViewInit() {

  }

  displayFn(selectorElement?: SelectorElement): string | undefined {
    return selectorElement ? selectorElement.nombre : undefined;
  }

  private _filter(name: string): SelectorElement[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().indexOf(filterValue) >= 0);
  }

  itemSelected(evt: any) {
    const value = evt.option.value;
    console.log("Option selected: ", value);
    /*this.value = value; 
    value.ID = value.id;*/
    this.optionSelected.emit(value);
  }

  closed(evt: any) {
    console.log(evt.srcElement.value);
    //evt.srcElement.value = "";
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changed app-selector-default: ", changes);
    this.initialize();
  }

  async initialize() {
    if (this.placeholder == null) this.placeholder = await this.models.setPlaceHolder(this.nombre);
    if (this.required == null) this.required = false;
    if (this.tipo == "hardcode") {
      this.options = this.models.valor(this.nombre);
    } else {
      this.options = await this.selectorService.getSelector(this.nombre , this.filter);
    }
    if (this.options) {
      this.filteredOptions = this.myControl.valueChanges 
      .pipe( 
        startWith<string | SelectorElement>(''), 
        map(value => typeof value === 'string' ? value : ''), 
        map(name => name ? this._filter(name) : this.options.slice()) 
      ); 
      let filter = this.options.filter(option => option.ID == this.matSelect); 
      let option = filter.length>0?filter[0]:null; 
      this.myControl.setValue(option); 
      if (this.disabled == true) {
        this.myControl.disable();
      } else {
        this.myControl.enable();
      }
    }
  }
}
