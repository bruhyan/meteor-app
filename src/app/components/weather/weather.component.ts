import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { WeatherService } from '../../services/weather/weather.service';
import { GeocodeService } from '../../services/geocode/geocode.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  twoHrForecasts: any;
  locationCoordinateMap: any;
  selectedLocationSubscription: Subscription;
  location: any = {
    city: '',
    location: {}
  };
  closestLocation: any;

  twoHrWeather;

  @Input()
  selectedLocation: Observable<Object>;

  constructor(private weatherService: WeatherService, private geocodeService: GeocodeService) { }

  ngOnInit(): void {
    this.weatherService.get2HrForecast().subscribe(async (forecasts) => {
      this.twoHrForecasts = forecasts;
      this.locationCoordinateMap = this.twoHrForecasts.area_metadata;
    })
    this.selectedLocationSubscription = this.selectedLocation.subscribe(async (location) => {
      console.log('received location in weather', location);
      this.location = location;
      const closestLocation = await this.calculateClosestLocation(this.location.location.latitude, this.location.location.longitude);
      this.setWeather(closestLocation);
    })
  }

  setWeather(closestLocation) {
    console.log(this.twoHrForecasts);
    console.log(closestLocation);
    const forecasts = this.twoHrForecasts.items[0].forecasts;
    console.log(forecasts);
    for (let w of forecasts) {
      if (closestLocation === w.area) {
        this.twoHrWeather = w.forecast;
        console.log(w.forecast);
      }
    }
  }

  // haversine formula
  // https://en.wikipedia.org/wiki/Haversine_formula
  async calculateClosestLocation(lat1: number, lon1: number) {
    let minDist = 999999; //km
    let closestLocation = '';
    for (let l of this.locationCoordinateMap) {
      let lat2 = l.label_location.latitude;
      let lon2 = l.label_location.longitude;
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1);
      var dLon = this.deg2rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      if (d < minDist) {
        minDist = d;
        closestLocation = l.name;
      }
    }
    console.log('closest is ', closestLocation);
    return closestLocation;

  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

}
