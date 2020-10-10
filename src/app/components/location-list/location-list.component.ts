import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TrafficService } from '../../services/traffic/traffic.service';
import { GeocodeService } from '../../services/geocode/geocode.service';

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  screenshot1;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

  }

  constructor(private trafficService: TrafficService, private geocodeService: GeocodeService) { }

  ngOnInit(): void {
    this.trafficService.getTrafficScreenshots().subscribe((screenshots) => {
      // console.log(screenshots);
      this.dataSource = new MatTableDataSource(screenshots.items[0].cameras);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.filteredData);
      for (let i of this.dataSource.filteredData) {
        this.geocodeService.getCityFromGeoCode(i.location.latitude, i.location.longitude).subscribe((city) => {
          i.city = city.locality;
        });

      }
      console.log(this.dataSource);
    })
  }

}


