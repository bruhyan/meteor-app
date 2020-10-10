import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedDateTime: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
  }

  propagateDateTime(date: string) {
    this.selectedDateTime.next(date);
  }

}
