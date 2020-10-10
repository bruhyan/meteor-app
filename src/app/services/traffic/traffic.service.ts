import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {

  constructor(private httpClient: HttpClient) { }

  selectedDateTime: string;

  getTrafficScreenshots(dateTime: String): Observable<any> {
    return this.httpClient.get(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`);
  }
}
