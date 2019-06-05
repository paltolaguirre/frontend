import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  menuOpened: boolean;

  constructor(
    private authenticationService: AuthService
  ) { }

  ngOnInit() {

    const currentUser = this.authenticationService.currentUserValue;
    const currentEnv = this.authenticationService.currentEnvValue;

    if (currentUser.tenant) {
      this.menuOpened = currentEnv.showMenu;
      if(currentEnv.showToolBar) {
        document.getElementById('toolbar').style.display = 'block';
      } else {
        document.getElementById('toolbar').style.display = 'none';
      }
    } else {
      this.menuOpened = false;
      document.getElementById('toolbar').style.display = 'none';
    }
  }

}
