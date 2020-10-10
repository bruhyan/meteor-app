import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {

  constructor(private httpClient: HttpClient) { }

  getTrafficScreenshots(): Observable<any> {
    return this.httpClient.get('https://api.data.gov.sg/v1/transport/traffic-images?date_time=2020-10-08T21%3A19%3A15Z');
  }

  getLocation(lat: String, long: String): Observable<any> {
    return this.httpClient.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=1.323604823&longitude=103.8587802&localityLanguage=en');
  }
}
