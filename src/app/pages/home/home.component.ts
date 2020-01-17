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
  weatherUrl;
  forecastUrl = environment.apiUrl + '/forecast';
  cityUrl;
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
        this.weatherUrl = environment.apiUrl + '/weather';
        this.cityUrl = environment.apiUrl + '/find';

        try {
          this.count = 0;
          this.weatherService.getWeatherDataByCoords(this.weatherUrl, this.lat, this.lon, this.count).subscribe(data => {
            this.weather = data;
          });
        }
        catch(error) {
          console.error('this is the error message', error);
        }  

        try {
          this.count = 0;
            this.weatherService.getWeatherDataByCoords(this.forecastUrl, this.lat, this.lon, this.count).subscribe(data => {
            this.forecast = data;
            this.forecastWeather = this.getfourDays(this.forecast);
            this.weatherService.setCityForecast(this.forecastWeather);
          });
        }
        catch(error) {
          console.error('this is the error message', error);
        }

        try {
          this.count = 20;
          this.weatherService.getWeatherDataByCoords(this.cityUrl, this.lat, this.lon, this.count).subscribe(data => {
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
      this.weatherService.getWeatherDataByCoordsAndId(this.forecastUrl, this.count, id).subscribe(data => {
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
    for(let i = 0; i<32; i+=8) {
      const temporary:  Weather =
        {
          id: i/8,
          date: weatherArray.list[i].dt_txt,
          icon: weatherArray.list[i].weather[0].icon,
          maxTemp: weatherArray.list[i].main.temp_max,
          minTemp: weatherArray.list[i].main.temp_min
        };
      this.cityForecast.push(temporary);
    }
    return this.cityForecast
  }
}
