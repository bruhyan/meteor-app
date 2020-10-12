// internal imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// external imports
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

//components
import { MainComponent } from './components/main/main.component';
import { InputComponent } from './components/input/input.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { ImageComponent } from './components/image/image.component';
import { WeatherComponent } from './components/weather/weather.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InputComponent,
    LocationListComponent,
    ImageComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    NgbTimepickerModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatSortModule
  ],
  providers: [
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    NgbTimepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    MatSortModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
