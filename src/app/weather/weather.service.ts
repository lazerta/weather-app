import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICurrentWeather} from '../interfaces';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

export interface IWeatherService {
    getCurrentWeather(city: string, country: string): Observable<ICurrentWeather>;

}

@Injectable()
export class WeatherService implements IWeatherService {

    constructor(private request: HttpClient) {
    }

    getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
        return this.request.get<ICurrentWeatherData>(
            `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
            `q=${city},${country}&appid=${environment.appId}`
        ).pipe(map(data => this.transformToICurrent(data)));

    }

    private transformToICurrent(data: ICurrentWeatherData): ICurrentWeather {
        return {
            country: data.sys.country,
            date: data.dt * 1000,
            description: data.weather[0].description,
            image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            temperature: this.convertKelvinToFahrenheit(data.main.temp),
            city: data.name,
        };
    }

    private convertKelvinToFahrenheit(kevin: number): number {
        return kevin * 9 / 5 - 459.67;
    }
}
