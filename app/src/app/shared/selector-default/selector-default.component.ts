import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { SelectorElement} from './selector-default.model';
import { SelectorService } from './selector-default.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-selector-default',
  templateUrl: './selector-default.component.html',
  styleUrls: ['./selector-default.component.css']
})
export class SelectorDefaultComponent implements OnInit {
  @Input() placeholder: string = 'Seleccione una opción';
  @Input() value: SelectorElement;
  @Input('type') tipo: string;
  @Output() optionSelected = new EventEmitter();

  myControl = new FormControl();
  options: SelectorElement[];

  filteredOptions: Observable<SelectorElement[]>;

  constructor(private selectorService: SelectorService) { }
    
  async ngOnInit() {
    this.placeholder = await this.setPlaceHolder(this.tipo);
    this.options = await this.selectorService.getSelector(this.tipo);
    this.filteredOptions = this.myControl.valueChanges 
    .pipe( 
      startWith<string | SelectorElement>(''), 
      map(value => typeof value === 'string' ? value : ''), 
      map(name => name ? this._filter(name) : this.options.slice()) 
    ); 
    let filter = this.options.filter(option => option.ID == this.value.ID); 
    let option = filter.length>0?filter[0]:null; 
    this.myControl.setValue(option); 
  }


  async setPlaceHolder(tipo: string) : Promise<string> {
    switch (tipo) { 
      case 'localidad': 
        return "Seleccione una localidad"; 
      case 'provincia': 
        return "Seleccione una provincia"; 
      case 'pais': 
        return "Seleccione un país";    
      case 'modalidadcontratacion': 
        return "Seleccione modalidad de contratación"; 
      case 'situacion': 
        return "Seleccione situación"; 
      case 'condicion': 
        return "Seleccione condición"; 
      case 'condicionsiniestrado': 
        return "Seleccione condición siniestrado"; 
      case 'obrasocial': 
        return "Seleccione una obra social"; 
      case 'conveniocolectivo': 
        return "Seleccione convenio colectivo"; 
      case 'centrodecosto': 
        return "Seleccione centro de costo"; 
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
    this.value.ID = value.ID;
    this.value.nombre = value.nombre;
    this.optionSelected.emit(value);
  }

  closed(evt: any) {
    console.log(evt.srcElement.value);
    //evt.srcElement.value = "";
  }

}
