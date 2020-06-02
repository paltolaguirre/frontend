import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public isShown: boolean;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loadingEmitter.subscribe(state => {
      this.isShown = state;
    });
  }

}
