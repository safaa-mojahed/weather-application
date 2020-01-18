import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { environment } from 'src/environments/environment';
import { Weather } from 'src/app/interfaces/weather';
import { CityPipePipe } from 'src/app/pipes/city-pipe.pipe'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
  lat;
  lon;
  count;
  weather;
  date;
  dayName;
  currentDay;
  currenDate;
  forecast;
  aroundCities;
  cityWeather;
  cityForecast: Weather[] = [];
  forecastWeather: Weather[] = [];
  idForecast: Weather[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;

        try {
          this.count = 100;
          this.weatherService.getWeatherDataByCoords(environment.apiUrl+'/weather', this.lat, this.lon, this.count).subscribe(data => {
            this.weather = data;
            this.currenDate = new Date()
            this.currentDay = environment.days[this.currenDate.getDay()];
            console.log(this.weather);
          });
        }
        catch(error) {
          console.error('this is the error message', error);
        }  

        try {
          this.count = 0;
            this.weatherService.getWeatherDataByCoords(environment.apiUrl+'/forecast', this.lat, this.lon, this.count).subscribe(data => {
            this.forecast = data;
            console.log(this.forecast);
            this.forecastWeather = this.getfourDays(this.forecast);
            this.weatherService.setCityForecast(this.forecastWeather);
          });
        }
        catch(error) {
          console.error('this is the error message', error);
        }

        try {
          this.count = 20;
          this.weatherService.getWeatherDataByCoords(environment.apiUrl+'/find', this.lat, this.lon, this.count).subscribe(data => {
            this.aroundCities = data;
          });
        }
        catch(error) {
          console.error('this is the error message', error);
        }  

      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onCityClick(id): void {
    try {
      this.count = 0;
      this.weatherService.getWeatherDataByCoordsAndId(environment.apiUrl+'/forecast', this.count, id).subscribe(data => {
        this.cityWeather = data;
        this.idForecast = this.getfourDays(this.cityWeather);
        this.weatherService.setCityForecast(this.idForecast);
      });
    }
    catch(error) {
      console.error('this is the error message', error);
    }  
  }

  getfourDays(weatherArray) {
    this.cityForecast = [];
    for(let i = 8; i<40; i+=8) {
      this.date = new Date(weatherArray.list[i].dt_txt);
      this.dayName = environment.days[this.date.getDay()];
      const temporary:  Weather =
        {
          id: i/8,
          date: weatherArray.list[i].dt_txt,
          weather: weatherArray.list[i].weather,
          main: weatherArray.list[i].main,
          wind: weatherArray.list[i].wind,
          day: this.dayName,
          sys: weatherArray.list[i].sys,
          city: weatherArray.city
        };
      this.cityForecast.push(temporary);
    }
    console.log(this.cityForecast);
    return this.cityForecast
  }
}
