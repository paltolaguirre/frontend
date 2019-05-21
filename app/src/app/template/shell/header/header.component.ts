import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title = '';

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async onClick() {
    await this.authenticationService.logout();
    this.router.navigate(['auth/login']);
  }
}
