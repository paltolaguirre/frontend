import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaItems, LiquidacionService } from '../../liquidacion.service';
import { Liquidacion } from '../../liquidacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() liquidacion: number;
  @Output() public update = new EventEmitter<Liquidacion>();
  @Output() public delete = new EventEmitter<Liquidacion>();
  numeroLiquidacion: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private liquidacionService: LiquidacionService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/liquidaciones', this.liquidacion]);
  }

  async deleteItem() {
    const item: Liquidacion = {
      ID: this.liquidacion,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      nombre: null,
      codigo: null,
      descripcion: null,
      activo: null,
      legajo: null,
      legajoid: null,
      tipo : null,
      tipoid : null,
      fecha : null,
      fechaultimodepositoaportejubilatorio : null,
      fechaultimodepositoaportejubilatoriomes : null,
      fechaultimodepositoaportejubilatorioanio : null,
      zonatrabajo : null,
      condicionpago : null,
      condicionpagos : null,
      cuentabancoid : null, 
      banco : null,
      fechaperiododepositado : null,
      fechaperiododepositadomes : null,
      fechaperiododepositadoanio : null,
      fechaperiodoliquidacion : null,
      fechaperiodoliquidacionmes : null,
      fechaperiodoliquidacionanio : null,
      importesremunerativos : null,
      importesnoremunerativos : null,
      descuentos : null,
      retenciones : null,
      aportespatronales : null,
      situacionrevistauno: null,
      situacionrevistaunoid : null,
      fechasituacionrevistauno : null
    }
    await this.liquidacionService.deleteLiquidacion(item);
    this.delete.emit(item);
  }
}
