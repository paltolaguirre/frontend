import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems, NovedadService } from '../../novedad.service';
import { Novedad } from '../../novedad.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() novedad: number;
  @Output() public update = new EventEmitter<Novedad>();
  @Output() public delete = new EventEmitter<Novedad>();
  numeroNovedad: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private novedadService: NovedadService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/novedades', this.novedad]);
  }

  async deleteItem() {
    const item: Novedad = {
      ID: this.novedad,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      nombre: null,
      codigo: null,
      descripcion: null,
      activo: null,
      importe: null,
      cantidad: null,
      fecha: null,
      legajo: null,
      legajoid: null,
      concepto: null,
      conceptoid: null
    }
    
    await this.novedadService.deleteNovedad(item);
    this.delete.emit(item);
  }
}
