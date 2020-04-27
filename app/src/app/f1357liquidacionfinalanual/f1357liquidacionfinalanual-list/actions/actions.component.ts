import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaItems, F1357liquidacionfinalanualService } from '../../f1357liquidacionfinalanual.service';
import { F1357liquidacionfinalanual } from '../../f1357liquidacionfinalanual.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() f1357liquidacionfinalanual: number;
  @Output() public update = new EventEmitter<F1357liquidacionfinalanual>();
  @Output() public delete = new EventEmitter<F1357liquidacionfinalanual>();
  numeroFcargassociales: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private liquidacionfinalanualService: F1357liquidacionfinalanualService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/f1357liquidacionfinalanual', this.f1357liquidacionfinalanual]);
  }

}