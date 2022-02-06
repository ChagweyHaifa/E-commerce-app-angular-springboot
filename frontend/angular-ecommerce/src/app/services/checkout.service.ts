import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = 'http://localhost:8070/api/checkout/purchase';
  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>{
    // any return type
    return this.httpClient.post<Purchase>(this.baseUrl,purchase);
  }
}
