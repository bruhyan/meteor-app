import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';

// Services
import { TrafficService } from '../../services/traffic/traffic.service';
import { GeocodeService } from '../../services/geocode/geocode.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

  displayedColumns: string[] = ['location', 'date', 'view'];
  dataSource: any;

  selectedDateTimeSubscription: Subscription;

  @Input()
  selectedDateTime: Observable<string>;

  @Output() onSubmitLocation: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trafficService: TrafficService, private geocodeService: GeocodeService) { }

  ngOnInit(): void {
    this.selectedDateTimeSubscription = this.selectedDateTime.subscribe((date) => {
      this.setDataSource(date)
    });

    // default retrieve most recent list
    let currentDateTime = encodeURIComponent(moment(new Date()).format())
    this.setDataSource(currentDateTime);
  }

  // set table datasource
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

  //emit location selected to traffic and weather components
  submitLocation(location) {
    this.onSubmitLocation.emit(location);
  }

  //table filter
  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}


