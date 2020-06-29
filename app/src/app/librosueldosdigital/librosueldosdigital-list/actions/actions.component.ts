import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaItems, LibrosueldosdigitalService } from '../../librosueldosdigital.service';
import { Librosueldosdigital } from '../../librosueldosdigital.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() librosueldosdigital: number;
  @Output() public update = new EventEmitter<Librosueldosdigital>();
  @Output() public delete = new EventEmitter<Librosueldosdigital>();
  numeroFcargassociales: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private librosueldosdigitalService: LibrosueldosdigitalService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/librosueldosdigital', this.librosueldosdigital]);
  }

}