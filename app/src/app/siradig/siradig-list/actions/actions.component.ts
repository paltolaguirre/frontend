import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SiradigService } from '../../siradig.service';
import { Siradig } from '../../siradig.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() itemID: number;
  @Output() public update = new EventEmitter<Siradig>();
  @Output() public delete = new EventEmitter<Siradig>();

  constructor(
    public dialog: MatDialog,
    private siradigService: SiradigService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  editItem() {
    this.router.navigate(['/informes/siradig', this.itemID]);
  }

  async deleteItem() {
    const item: Siradig = {
      ID: this.itemID,
      CreatedAt: null,
      UpdatedAt: null,
      DeletedAt: null,
      legajo: null,
      legajoid: null,
      periodosiradig: null,
      detallecargofamiliarsiradig: null,
      importegananciasotroempleosiradig: null,
      deducciondesgravacionsiradig: null,
      retencionpercepcionsiradig: null,
      beneficiosiradig: null,
      ajustesiradig: null
    }

    await this.siradigService.deleteSiradig(item);
    this.delete.emit(item);
  }
}