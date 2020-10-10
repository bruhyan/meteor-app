import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private httpClient: HttpClient) { }

  getCityFromGeoCode(latitude: String, longitude: string): Observable<any> {
    return this.httpClient.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
  }
}
