import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  get2HrForecast(datetime: string): Observable<any> {
    return this.httpClient.get(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${datetime}`).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    // can do additional error handling if needed.
    return throwError('Failed to retrieve weather forecast. Please try again later.');
  }
}
