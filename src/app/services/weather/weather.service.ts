import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  get2HrForecast(datetime: string): Observable<any> {
    return this.httpClient.get(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${datetime}`);
  }
}
