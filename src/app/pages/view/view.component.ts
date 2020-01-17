import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import {Weather} from 'src/app/interfaces/weather';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  weatherId;
  cityForecast: Weather[] = [];

  constructor(private route: ActivatedRoute, private WeatherService: WeatherService) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.weatherId = id;
    this.cityForecast = this.WeatherService.getCityForecast();
    console.log(this.weatherId,this.cityForecast);
  }
}
