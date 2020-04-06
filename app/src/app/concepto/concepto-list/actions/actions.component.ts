import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaItems, ConceptoService } from '../../concepto.service';
import { Concepto } from '../../concepto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() concepto: number;
  @Output() public update = new EventEmitter<Concepto>();
  @Output() public delete = new EventEmitter<Concepto>();
  @Output() public view = new EventEmitter<Concepto>();
  numeroConcepto: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private conceptoService: ConceptoService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  viewItem() {
    this.router.navigate(['/conceptos', this.concepto]);
  }

  editItem() {
    this.router.navigate(['/conceptos', this.concepto]);
  }

  async deleteItem() {
    const item: Concepto = {
      ID: this.concepto,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      nombre: null,
      codigo: null,
      descripcion: null,
      activo: null,
      tipo: null,
      cuentacontableid: null,
      cuenta: null,
      esimprimible : null,
      esnovedad: null,
      tipoconceptoid: null,
      tipoconcepto:  null,
      porcentaje: null,
      tipodecalculo: null,
      tipodecalculoid: null,
      prorrateo: null,
      basesac: null,
      tipoimpuestoganancias: null,
      tipoimpuestogananciasid: null,
      esremvariable: null
    }
    
    await this.conceptoService.deleteConcepto(item);
    this.delete.emit(item);
  }
}