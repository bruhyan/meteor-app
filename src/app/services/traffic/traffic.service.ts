import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {

  constructor(private httpClient: HttpClient) { }

  selectedDateTime: string;

  getTrafficScreenshots(dateTime: String): Observable<any> {
    return this.httpClient.get(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    // can do additional error handling if needed.
    return throwError('Failed to retrieve traffic screenshots. Please make sure your date and time inputs are correct.');
  }
}
