import { Component, OnInit, Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    //Validators.email,
  ]);
  
  passFormControl = new FormControl('', [
    Validators.required
  ]);
  tenantFormControl = new FormControl('', [
    Validators.required,
    //Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onSubmit() {
    const user:User = {
      Authorization : "Basic "+btoa(this.emailFormControl.value+":"+this.passFormControl.value+":tnt_1200061"),
      username: String(this.emailFormControl.value),
      pass: String(this.passFormControl.value),
      tenant: String(this.tenantFormControl.value)
    }; 
    
    const data = await this.authenticationService.login(user.Authorization);

    // login successful if there's a jwt token in the response
    if (data && data.token) {
      this.router.navigate([this.returnUrl]);
    }
  }
}
