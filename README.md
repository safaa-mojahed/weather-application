# WeatherApplication
This project is a weather application, and is a mobile application, it has three pages:


1- login page:

    Username: admin@pseu.edu
    Password: Admin123@
    
    The validation are:
    - Email domain name should be @pseu.edu.
    - Email is required.
    - Password is should include special character, captal letter,small letter, and number.

2- home page:
   - All the data are real data from openWeather API.
   - Contain the weather details for today by getting your current location using today service from api.
   - Contain the weather details for 5 days with 3 hours, but the data filtered to show onlu 4 days only,   using forecast service.
   - If you click on any day from the 4 days, another page will open[details page].
   - There is a menu icon in the left side of the page, if you click it a serach bar will open with list    contain 20 city, if you click any city or search it, the home page data will change to this city,    
     rather than your current location.

3- details page:
    - This page contain a more detailes about the weather such as the humidity and pressure...


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
