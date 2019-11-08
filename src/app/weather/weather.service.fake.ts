import {IWeatherService} from 'src/app/weather/weather.service';
import {Observable, of} from 'rxjs';
import {ICurrentWeather} from 'src/app/interfaces';

export class WeatherServiceFake implements IWeatherService {
    private fakeWeather: ICurrentWeather = {
        city: 'NYC',
        country: 'USA', date: 1522, image: '', temperature: 280.32,
        description: 'description'
    };

    getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
        return of(this.fakeWeather);
    }

}
