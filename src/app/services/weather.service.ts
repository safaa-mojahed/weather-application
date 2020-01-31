import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather } from 'src/app/interfaces/weather';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {
	cityForecast: Weather[] = [];
	isLogged;

	constructor(private http: HttpClient, private router: Router) { 
		this.isLogged = false;
	}

	//get weather data based on the request in url.
	getWeatherDataByCoords(url, lat, lon, count) {
		let params = new HttpParams()
			.set('lat', lat)
			.set('lon', lon)
			.set('units', 'imperial')
			.set('appid', environment.apiKey)
			.set('cnt', count)

		try {
			return this.http.get(url, { params });
		}
		catch (error) {
			console.error('here is the error message', error);
		}
	}

	//get weather data based on city id.
	getWeatherDataByCoordsAndId(url, count, id) {
		let params = new HttpParams()
			.set('units', 'imperial')
			.set('appid', environment.apiKey)
			.set('cnt', count)
			.set('id', id)

		try {
			return this.http.get(url, { params });
		}
		catch (error) {
			console.error('here is the error message', error);
		}
	}

	//set and get for 4 days forecat weather data.
	setCityForecast(cityForecast) {
		this.cityForecast = cityForecast;
	}
	getCityForecast() {
		return this.cityForecast;
	}

	//authenticate the username and password entered by the user in the login page
	authentic(username, password) {
		if(username == 'admin@pseu.edu' && password == 'Admin123@') {
			this.isLogged = true;
			this.router.navigate(['home']);
			return true;
		}
		return false
	}

	//check isLogged value for authentication.
	getIsLogged() {
		return this.isLogged;
	}
}
