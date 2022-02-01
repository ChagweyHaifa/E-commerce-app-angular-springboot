import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private baseUrl = 'http://localhost:8070/api/';
  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];
    // build an array for "Month" dropdown list
    // - start at current month and loop until 
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    
    let data: number[] = [];
    // build an array for "Year" downlist list
    // - start at current year and loop for next 10 years
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }

  getCountryList(): Observable<Country[]> {
    const searchUrl = `${this.baseUrl}countries`;
    return this.httpClient.get<GetResponseCountries>(searchUrl).pipe(
      map(response => response._embedded.countries));
      }
  
  getStateList(code:string): Observable<State[]> {
    const searchUrl = `${this.baseUrl}states/search/findByCountryCode?code=${code}`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
      map(response => response._embedded.states));
      }

}
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}