# MeteorApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.5.

# What you need
- npm
- Angular version 10, to install run the following command in your terminal
```shell
npm install -g @angular/cli
```

# Running instructions
1) Clone this repository
2) Navigate to root directory
3) Install the required packages using command:
```shell
npm install
```
4) Start the development server using command:
```shell
ng serve
```

# Assumptions and Interpretations of assessment requirements

Assumption 1:
In feature point 2, it is stated "use a reverse geocoding service (API 2: Weather Forecast)..."
And in the later part it is stated "you are required to look for an API that does reverse geo-coding..."
As it was not too clear whether the reverse geocoding service is API itself, I assumed that we are able to use a third party reverse geo-coding API (as it is not intuitive to use the weather forecast API for reverse geo-coding purposes). The third party API used can be found here: (https://www.bigdatacloud.com/)

Assumption 2:
In feature point 3, it seems like we only need to utilise the weather forecast api using the location as parameter. As only the 2 hour weather forecast API has a mapping from weather to location, only the 2 hour weather forecast API was used, not the 24 hour and 4 day forecasts API.
