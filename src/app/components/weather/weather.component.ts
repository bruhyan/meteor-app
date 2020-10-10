import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

// services
import { WeatherService } from '../../services/weather/weather.service';

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
    formattedDate: '',
    location: {}
  };
  closestLocation: any;
  twoHrWeather;

  @Input()
  selectedLocation: Observable<Object>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    // default get forecast for current time
    let currentDateTime = encodeURIComponent(moment(new Date()).format())
    this.get2HrForecast(currentDateTime);

    // listen for incoming selected location and set new weather
    this.selectedLocationSubscription = this.selectedLocation.subscribe(async (location: any) => {
      this.location = location;
      let date = encodeURIComponent(location.timestamp);
      this.get2HrForecast(date);
      const closestLocation = await this.calculateClosestLocation(this.location.location.latitude, this.location.location.longitude);
      this.setWeather(closestLocation);
    })
  }

  get2HrForecast(date: string) {
    this.weatherService.get2HrForecast(date).subscribe(async (forecasts) => {
      this.twoHrForecasts = forecasts;
      this.locationCoordinateMap = this.twoHrForecasts.area_metadata;
    })
  }

  setWeather(closestLocation) {
    const forecasts = this.twoHrForecasts.items[0].forecasts;
    for (let w of forecasts) {
      if (closestLocation === w.area) {
        this.twoHrWeather = w.forecast;
      }
    }
  }

  // haversine formula
  // https://en.wikipedia.org/wiki/Haversine_formula
  // given a latitude and longitude, this function returns the closest location
  // using weather forecast API area metadata
  async calculateClosestLocation(lat1: number, lon1: number) {
    let minDist = 999999; //km
    let closestLocation = '';
    for (let l of this.locationCoordinateMap) {
      let lat2 = l.label_location.latitude;
      let lon2 = l.label_location.longitude;
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2 - lat1); // difference in latitude
      var dLon = this.deg2rad(lon2 - lon1); // difference in longitude
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
    return closestLocation;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

}
