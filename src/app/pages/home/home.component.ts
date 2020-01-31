import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { environment } from 'src/environments/environment';
import { Weather } from 'src/app/interfaces/weather';
import { CityPipePipe } from 'src/app/pipes/city-pipe.pipe'
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit{
	@HostListener('window:scroll', ['$event']) // for window scroll events
	//after scroll more than 10 the search header style will change. 
	onScroll(event) {
		if(this.formElementRef.nativeElement.scrollTop > 10) {
			this.labelElementRef.nativeElement.classList.add('shrink');
			this.inputElementRef.nativeElement.classList.add('shrink');
		}
		if(this.formElementRef.nativeElement.scrollTop < 10) {
			this.labelElementRef.nativeElement.classList.remove('shrink');
			this.inputElementRef.nativeElement.classList.remove('shrink');
		}
	}

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
	//get elements form html page.
	@ViewChild('formRef', { static: true }) formElementRef: ElementRef;
	@ViewChild('labelRef', { static: true }) labelElementRef: ElementRef;
	@ViewChild('inputRef', { static: true }) inputElementRef: ElementRef;

	constructor(private weatherService: WeatherService, private router: Router) { }

	ngOnInit() {
		this.getCurrentLocation();
	}

	//get the current location lat and lon, and send data to weather service.
	getCurrentLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(position => {
				this.lat = position.coords.latitude;
				this.lon = position.coords.longitude;

				//get weather data for today.
				try {
					this.count = 100;
					this.weatherService.getWeatherDataByCoords(environment.apiUrl + '/weather', this.lat, this.lon, this.count).subscribe(data => {
						this.weather = data;
						this.currenDate = new Date()
						this.currentDay = environment.days[this.currenDate.getDay()];
					});
				}
				catch (error) {
					console.error('this is the error message', error);
				}

				//get weather data for 4 day forecast.
				try {
					this.count = 0;
					this.weatherService.getWeatherDataByCoords(environment.apiUrl + '/forecast', this.lat, this.lon, this.count).subscribe(data => {
						this.forecast = data;
						this.forecastWeather = this.getfourDays(this.forecast);
						this.weatherService.setCityForecast(this.forecastWeather);
					});
				}
				catch (error) {
					console.error('this is the error message', error);
				}

				//get all around cities with count equal to 20 city.
				try {
					this.count = 20;
					this.weatherService.getWeatherDataByCoords(environment.apiUrl + '/find', this.lat, this.lon, this.count).subscribe(data => {
						this.aroundCities = data;
					});
				}
				catch (error) {
					console.error('this is the error message', error);
				}

			});
		}
		else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	//on click on city in the city list the data weather forecast will return for this city.
	onCityClick(id): void {
		try {
			this.count = 0;
			this.weatherService.getWeatherDataByCoordsAndId(environment.apiUrl + '/forecast', this.count, id).subscribe(data => {
				this.cityWeather = data;
				this.weather = this.cityWeather.list[0];
				this.weather.name = this.cityWeather.city.name;
				this.weather.sys.country = this.cityWeather.city.country;
				this.idForecast = this.getfourDays(this.cityWeather);
				this.weatherService.setCityForecast(this.idForecast);
				this.forecastWeather = this.idForecast;
				this.closeNav();
			});
		}
		catch (error) {
			console.error('this is the error message', error);
		}
	}

	// filter the array to 4 days forecast rather than 5 days with 3
	// hours data and create object form interface for each day.
	getfourDays(weatherArray) {
		this.cityForecast = [];
		for (let i = 8; i < 40; i += 8) {
			this.date = new Date(weatherArray.list[i].dt_txt);
			this.dayName = environment.days[this.date.getDay()];
			const temporary: Weather =
			{
				id: i / 8,
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
		return this.cityForecast
	}

	//functions for search to open and close it.
	openNav() {
		document.getElementById("mySidenav").style.width = "100%";
	}

	closeNav() {
		document.getElementById("mySidenav").style.width = "0";
	}
}
