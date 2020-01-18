import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import {Weather} from 'src/app/interfaces/weather';
import { parse } from 'querystring';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  weatherId;
  day;
  cityForecast: Weather[] = [];

  constructor(private route: ActivatedRoute, private WeatherService: WeatherService, private router: Router) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    let day = (this.route.snapshot.paramMap.get('day')).toString();
    this.weatherId = id;
    this.day = day;
    this.cityForecast = this.WeatherService.getCityForecast();
  }

  newChange(): void {
    this.router.navigateByUrl('home');
  }
}
