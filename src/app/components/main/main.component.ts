import { Component, OnInit } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedDateTime: Subject<string> = new Subject<string>();
  selectedLocation: Subject<Object> = new Subject<Object>();

  constructor() { }

  ngOnInit(): void {
  }

  propagateDateTime(date: string) {
    this.selectedDateTime.next(date);
  }

  propagateLocation(location: Object) {
    this.selectedLocation.next(location);
  }

}
