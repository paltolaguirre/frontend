import { Component, AfterViewInit, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListaItems, LibrosueldosService } from '../../librosueldos.service';
import { Librosueldos } from '../../librosueldos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() librosueldos: number;
  @Output() public update = new EventEmitter<Librosueldos>();
  @Output() public delete = new EventEmitter<Librosueldos>();
  numeroLibrosueldos: string;
  conductor: string;
  fecha: string;
  tipo: string;

  constructor(
    public dialog: MatDialog,
    private librosueldosService: LibrosueldosService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/librosueldoss', this.librosueldos]);
  }

}