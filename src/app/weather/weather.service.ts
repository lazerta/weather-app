import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICurrentWeather} from '../interfaces';
import {environment} from '../../environments/environment';

interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
    ];
  main: {
    temp: number
  };
  sys: {
    country: string
  };
  dt: number;
  name: string;
}

@Injectable()
export class WeatherService {

  constructor(private request: HttpClient) {
  }

  getCurrentWeather(city: string, country: string) {
    return this.request.get <ICurrentWeatherData>
    (`${environment.baseUrl}api.openweather-map.org/data/2.5/weather?q=${city},
    ${country}&appid=${environment.appId}`);
  }
}
