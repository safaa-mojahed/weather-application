import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cityPipe'
})
export class CityPipePipe implements PipeTransform {

  transform(cities: any[], cityName: string): any {
    if(!cities) {
      return [];
    }
    if(!cityName) {
      return cities;
    }
    cityName = cityName.toLowerCase();
    return cities.filter( it => {
      return it.toLowerCase().includes(cityName);
    });
  }

}
