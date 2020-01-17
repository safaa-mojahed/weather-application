import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cityPipe'
})
export class CityPipePipe implements PipeTransform {

  transform(cities: any[], cityName: string): any {
    if(cityName) {
      return cities.filter(city => city.name.toLocaleUpperCase().startsWith(cityName.toLocaleUpperCase()))
    }
    return cities;
  }

}
