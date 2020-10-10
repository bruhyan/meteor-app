import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  get2HrForecast(): Observable<any> {
    return this.httpClient.get(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=2020-10-10T14%3A46%3A15%2B08%3A00`);
  }
}
