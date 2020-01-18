import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input('weather') weather: object;
  constructor(private router: Router) { }

  onSelect(weather) {
    this.router.navigate(['/home', weather.id, weather.day])
  }

  ngOnInit() {
  }

}
