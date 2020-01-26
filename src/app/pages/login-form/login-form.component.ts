import { Component, OnInit } from '@angular/core';
import {WeatherService} from 'src/app/services/weather.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  checkoutForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
  }

  loginUser(e) {
    e.preventDefault();;
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    this.weatherService.authentic(username, password);
    this.checkoutForm.reset();
  }

}
