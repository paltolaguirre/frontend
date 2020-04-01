import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaItems, FcargassocialesService } from '../../fcargassociales.service';
import { Fcargassociales } from '../../fcargassociales.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() fcargassociales: number;
  @Output() public update = new EventEmitter<Fcargassociales>();
  @Output() public delete = new EventEmitter<Fcargassociales>();
  numeroFcargassociales: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private fcargassocialesService: FcargassocialesService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/fcargassocialess', this.fcargassociales]);
  }

}