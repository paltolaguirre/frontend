import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems, LegajoService } from '../../legajo.service';
import { Legajo } from '../../legajo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() legajo: number;
  @Output() public update = new EventEmitter<Legajo>();
  @Output() public delete = new EventEmitter<Legajo>();
  numeroLegajo: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private legajoService: LegajoService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/legajos', this.legajo]);
  }

  async deleteItem() {
    const item: Legajo = {
      ID: this.legajo,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      nombre: null,
      apellido: null,
      codigo: null,
      descripcion: null,
      activo: null,
      legajo: null,
      cuil: null,
      cbu: null,
      direccion: null,
      hijos: null,
      paisid: null,
      localidadid: null,
      provinciaid: null,
      zonaid: null,
      telefono: null,
      email: null,
      modalidadcontratacionid: null,
      categoria: null,
      tarea: null,
      situacionid: null,
      condicionid: null,
      condicionsiniestradoid: null,
      obrasocialid: null,
      conveniocolectivoid: null,
      valorfijolrt: null,
      conyuge: null,
      remuneracion: null,
      horasmensualesnormales: null,
      fechaalta: null,
      fechabaja: null,
      centrodecostoid: null
    }

    await this.legajoService.deleteLegajo(item);
    this.delete.emit(item);
  }
}