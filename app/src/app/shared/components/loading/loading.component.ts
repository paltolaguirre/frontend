import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public isShown: boolean = false;

  constructor(private loadingService: LoadingService, private cdRef : ChangeDetectorRef) {}

  ngOnInit() {
    this.loadingService.loadingEmitter.subscribe(state => {
      this.isShown = state;
      this.cdRef.detectChanges();
    });
  }

}
