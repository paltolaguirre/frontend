import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems, F931Service } from '../../f931.service';
import { F931 } from '../../f931.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() f931: number;
  @Output() public update = new EventEmitter<F931>();
  @Output() public delete = new EventEmitter<F931>();
  numeroF931: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private f931Service: F931Service,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/f931s', this.f931]);
  }

}