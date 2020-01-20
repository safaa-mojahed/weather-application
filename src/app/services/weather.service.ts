import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather } from 'src/app/interfaces/weather';

@Injectable({
	providedIn: 'root'
})
export class WeatherService {
	cityForecast: Weather[] = [];

	constructor(private http: HttpClient) { }

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

	setCityForecast(cityForecast) {
		this.cityForecast = cityForecast;
	}
	getCityForecast() {
		return this.cityForecast;
	}
}
