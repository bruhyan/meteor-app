import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private httpClient: HttpClient) { }

  getCityFromGeoCode(latitude: String, longitude: string): Observable<any> {
    return this.httpClient.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    // can do additional error handling if needed.
    return throwError('Failed to retrieve location. Please try again later.');
  }
}
