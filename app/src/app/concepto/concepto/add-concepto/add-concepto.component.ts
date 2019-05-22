import { Component, AfterViewInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems, ConceptoService } from '../../concepto.service';
import { Concepto } from '../../concepto.model';

/*export interface DialogData {
  conceptoId: number;
  numeroConcepto: string;
  conductor: string;
  fecha: string;
  tipo: string;
}*/

@Component({
  selector: 'app-add-concepto',
  templateUrl: './add-concepto.component.html',
  styleUrls: ['./add-concepto.component.css']
})
export class AddConceptoComponent {
  @Input() concepto: number;
  @Output() public update = new EventEmitter<Concepto>();
  @Output() public delete = new EventEmitter<Concepto>();
  numeroConcepto: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(public dialog: MatDialog, private conceptoService: ConceptoService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddConceptoDialog, {
      width: '875px',
      height: '520px',
      data: { ID: this.concepto, numeroConcepto: this.numeroConcepto, fecha: this.fecha, tipo: this.tipo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialog fue cerrado '+ JSON.stringify(result));
      if(result) {
        this.update.emit(result);
      }
    });
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
      cuentacontable: null
    }

    await this.conceptoService.deleteConcepto(item);
    this.delete.emit(item);
  }

}

@Component({
  selector: 'add-concepto-dialog',
  templateUrl: 'add-concepto-dialog.component.html',
  styleUrls: ['./add-concepto.component.css'],
})
export class AddConceptoDialog implements AfterViewInit{
  @Output() public create = new EventEmitter<Concepto>();

  constructor(
    public dialogRef: MatDialogRef<AddConceptoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Concepto,
    private conceptoService: ConceptoService
  ) { 

  }
  
  async ngAfterViewInit() {
    console.log("ngAfterViewInit()");
    if (this.data.ID) {
      console.log("Nro. Concepto: " + this.data.ID);
      
      const conceptosItem: Concepto = await this.conceptoService.getConcepto(this.data.ID);
      this.data = conceptosItem;
    
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onClickSave(): Promise<Concepto> {
    let conceptosItem: Concepto;
    if (this.data.ID) {
      conceptosItem = await this.conceptoService.putConcepto(this.data);
    } else {
      conceptosItem = await this.conceptoService.postConcepto(this.data);
    }

    this.create.emit(conceptosItem)
    return conceptosItem;
  }
}