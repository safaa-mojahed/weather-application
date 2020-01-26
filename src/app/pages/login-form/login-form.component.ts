import { Component, OnInit } from '@angular/core';
import {WeatherService} from 'src/app/services/weather.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  email:  FormControl;
  password: FormControl;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}')]),
    });
  }

  passwordError() {
    return this.password.hasError('minlength') ? 'Your password is too short.' :
    this.password.hasError('maxlenth') ? 'your password is too long':
      this.password.hasError('pattern') ? 'Your password must have one uppercase letter, one lowercase letter, one number and one non alphanumeric character.' :
        ' ';
  }

  emailError() {
    return this.email.hasError('required') ? 'You must enter a value.' :
      this.email.hasError('email') ? 'Not a valid email. Please read the field again.' :
        ' ';
  }

  revert() {
    this.loginForm.reset();
  }

  loginUser(e) {
    e.preventDefault();;
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    this.weatherService.authentic(username, password);
  }

}
