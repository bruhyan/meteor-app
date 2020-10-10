import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TrafficService } from '../../services/traffic/traffic.service';
import { GeocodeService } from '../../services/geocode/geocode.service';
import { Observable, Subscription } from 'rxjs';

import * as moment from 'moment';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  displayedColumns: string[] = ['location', 'date', 'view'];
  dataSource: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  screenshot1;

  selectedDateTimeSubscription: Subscription;

  @Input()
  selectedDateTime: Observable<string>;

  @Output() onSubmitLocation: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

  }

  constructor(private trafficService: TrafficService, private geocodeService: GeocodeService) { }

  ngOnInit(): void {
    this.selectedDateTimeSubscription = this.selectedDateTime.subscribe((date) => {
      this.setDataSource(date)
    });

    let currentDateTime = encodeURIComponent(moment(new Date()).format())
    this.setDataSource(currentDateTime);
    // this.submitLocation(this.dataSource.filteredData[0]);
  }

  setDataSource(date: string) {
    this.trafficService.getTrafficScreenshots(date).subscribe((screenshots) => {
      this.dataSource = new MatTableDataSource(screenshots.items[0].cameras);
      this.dataSource.paginator = this.paginator;
      this.submitLocation(this.dataSource.filteredData[0]);
      for (let i of this.dataSource.filteredData) {
        i.formattedDate = moment(i.timestamp).format('lll');
        this.geocodeService.getCityFromGeoCode(i.location.latitude, i.location.longitude).subscribe((city) => {
          i.city = city.locality;
        });
      }
    })

  }

  submitLocation(location) {
    console.log(location);
    this.onSubmitLocation.emit(location);
  }

}


