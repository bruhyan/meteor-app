import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  name = new FormControl('');
  inputForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      date: [''],
      time: [''],
    })
  }

  ngOnInit(): void {
  }

  @Output() onSubmitDateTime: EventEmitter<any> = new EventEmitter<any>();

  submitDateTime() {
    let dateString: string = moment(this.inputForm.value.date).format().substring(0, 11);
    let timeString: string = moment(this.inputForm.value.time).format().substring(11);
    let formattedDate: string = encodeURIComponent(dateString.concat(timeString));
    this.onSubmitDateTime.emit(formattedDate);


  }

}
