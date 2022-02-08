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


  constructor(private httpClient: HttpClient) { }

 
  getProductList(theCategoryId: number): Observable<Product[]> {
      const searchUrl = `${this.baseUrl}products/search/findByCategoryId?id=${theCategoryId}`;
      return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}products/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductListPaginate(thePage: number, 
    thePageSize: number, 
    theCategoryId: number): Observable<GetResponseProducts> {
  // need to build URL based on category id, page and size 
  const searchUrl = `${this.baseUrl}products/search/findByCategoryId?id=${theCategoryId}`
  + `&page=${thePage}&size=${thePageSize}`;
  return this.httpClient.get<GetResponseProducts>(searchUrl);
  
  }
  
  searchProductsPaginate(thePage: number, 
    thePageSize: number, 
    theKeyword: string): Observable<GetResponseProducts> {

  // need to build URL based on category id, page and size 
  const searchUrl = `${this.baseUrl}products/search/findByNameContaining?name=${theKeyword}`
  + `&page=${thePage}&size=${thePageSize}`;
  return this.httpClient.get<GetResponseProducts>(searchUrl);

  }

  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl = `${this.baseUrl}category`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl).pipe(
      map(response => response._embedded.productCategories)
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
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategories: ProductCategory[];
  }
 
}