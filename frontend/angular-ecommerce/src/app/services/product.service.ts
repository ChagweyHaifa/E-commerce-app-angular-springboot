import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8070/api/';

  // private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  

  getProductList(theCategoryId: number): Observable<Product[]> {
      const searchUrl = `${this.baseUrl}products/search/findByCategoryId?id=${theCategoryId}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
        map(response => response._embedded.products));
        }
  
  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl = `${this.baseUrl}category`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl).pipe(
      map(response => response._embedded.productCategories)
    );
  }

 
  

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}products/search/findByNameContaining?name=${theKeyword}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    ); 
   }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}products/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategories: ProductCategory[];
  }
 
}