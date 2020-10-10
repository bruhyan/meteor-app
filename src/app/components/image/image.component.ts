import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor() { }

  selectedLocationSubscription: Subscription;
  location: any = {
    city: ''
  };

  @Input()
  selectedLocation: Observable<Object>;


  ngOnInit(): void {
    this.selectedLocationSubscription = this.selectedLocation.subscribe((location) => {
      console.log('received location in img', location);
      this.location = location;
    })

  }

}
