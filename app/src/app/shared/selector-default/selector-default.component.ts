import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { SelectorService } from './selector-default.service';
import { startWith, map } from 'rxjs/operators';
import { Options } from 'selenium-webdriver';

export interface SelectorElement {
  id: any;
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
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() value: SelectorElement;
  @Input('type') tipo: string;
  @Input('nombre') nombre: string;
  @Input('matSelect') matSelect: string;
  @Output() optionSelected = new EventEmitter();

  myControl = new FormControl();
  options: SelectorElement[];

  filteredOptions: Observable<SelectorElement[]>;

  constructor(private selectorService: SelectorService) { }
    
  async ngOnInit() {
    this.placeholder = await this.setPlaceHolder(this.nombre);
    if (this.tipo == "hardcode") {
      this.options = this.getOpciones(this.nombre);
    } else {
      this.options = await this.selectorService.getSelector(this.nombre);
    }
    if (this.options) {
      this.filteredOptions = this.myControl.valueChanges 
      .pipe( 
        startWith<string | SelectorElement>(''), 
        map(value => typeof value === 'string' ? value : ''), 
        map(name => name ? this._filter(name) : this.options.slice()) 
      ); 
      let filter = this.options.filter(option => option.id == this.matSelect); 
      let option = filter.length>0?filter[0]:null; 
      this.myControl.setValue(option); 
    }
  }
  
  getOpciones(nombre: string): SelectorElement[] {
    switch (nombre) { 
      case 'condicionpago': 
        return  [{nombre: 'Contado', id: 1},{nombre: 'Cuenta Corriente', id: 2}];      
      case 'provincia': 
      return  [{nombre: 'Contado', id: 1},{nombre: 'Cuenta Corriente', id: 2}];      
      case 'cuenta': 
      return  [{nombre: 'Contado', id: 1},{nombre: 'Cuenta Corriente', id: 2}];      
      default: 
      return  [];      
    } 
  }

  public onSelectChangeEvent(event,data)
  {
    eval("data."+this.nombre + " = " + event);
    eval("data."+this.nombre + "ID = " + event.ID);
  }

  async setPlaceHolder(nombre: string) : Promise<string> {
    switch (nombre) { 
      case 'condicionpago': 
        return "Condicion de Pago"; 
      case 'localidad': 
        return "Localidad"; 
      case 'provincia': 
        return "Provincia"; 
      case 'pais': 
        return "País"; 
      case 'modalidadcontratacion': 
        return "Modalidad de contratación"; 
      case 'situacion': 
        return "Situación"; 
      case 'condicion': 
        return "Condición"; 
      case 'condicionsiniestrado': 
        return "Condición siniestrado"; 
      case 'obrasocial': 
        return "Obra social"; 
      case 'conveniocolectivo': 
        return "Convenio colectivo"; 
      case 'legajo': 
          return "Legajo"; 
      case 'concepto': 
          return "Concepto"; 
      case 'centrodecosto': 
        return "Centro de costo"; 
        case 'cuenta': 
        return "Cuenta"; 
      default: 
      return "Seleccione..."; 
    } 
  }

  ngAfterViewInit() {
  
  }

  displayFn(selectorElement?: SelectorElement): string | undefined {
    return selectorElement ? selectorElement.nombre : undefined;
  }

  private _filter(name: string): SelectorElement[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  itemSelected(evt: any) {
    const value = evt.option.value;
    console.log(value);
    this.value = value; 
    value.ID = value.id;
    this.optionSelected.emit(value);
  }

  closed(evt: any) {
    console.log(evt.srcElement.value);
    //evt.srcElement.value = "";
  }

}
