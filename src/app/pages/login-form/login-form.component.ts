import { Component } from '@angular/core';
import {WeatherService} from 'src/app/services/weather.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent  {
  public email:  FormControl;
  public password: FormControl;

  constructor(private weatherService: WeatherService) {
    this.revert;
  }
  //create loginForm formGroup and add validators to its formCotrols.
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@pseu+.edu")]),
    password : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}')]),
  });

  //show error message for invalid password based on the error.
  passwordError() {
    return this.loginForm.controls.password.hasError('required') ? 'You must enter a value.' :
    this.loginForm.controls.password.hasError('minlength') ? 'Your password is too short.' :
    this.loginForm.controls.password.hasError('maxlenth') ? 'your password is too long':
    this.loginForm.controls.password.hasError('pattern') ? 'Your password must have one uppercase letter, one lowercase letter, one number and one non alphanumeric character.' :
        ' ';
  }

  //show error message for invalid email based on the error
  emailError() {
    return this.loginForm.controls.email.hasError('required') ? 'You must enter a value.' :
      this.loginForm.controls.email.hasError('email') ? 'Not a valid email. Please read the field again.' :
      this.loginForm.controls.email.hasError('pattern') ? 'your email must be in @pseu.edu domain name.' :
        ' ';
  }

  //reset all input field in the loginForm.
  revert() {
    this.loginForm.reset();
  }

  //check the email and password if valid using authentic function in service.
  loginUser() {
    this.weatherService.authentic(this.loginForm.value.email, this.loginForm.value.password);
    let email = this.loginForm.controls.email;
    let password = this.loginForm.controls.password;
    let isLogged = this.weatherService.authentic(email, password);
    if(!isLogged) {
      console.log("not logged")
      this.loginForm.reset();
    }
  }



}
