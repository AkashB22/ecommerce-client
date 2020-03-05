import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  ProductsListener = new Subject<any>();
  ProductsErrorListener = new Subject<any>();
  productsUrl = `http://localhost:3000/api/products`;
  products = {}

  getProducts(){
    this.http.get(this.productsUrl)
      .subscribe(
        response=>{
          this.ProductsListener.next(response);
        }, 
        error=>{
          this.ProductsErrorListener.next(error);
        }
      )
  }

  getProductsStatusListener(){
    return this.ProductsListener.asObservable()
  }

  getProductsErrorStatusListener(){
    return this.ProductsErrorListener.asObservable();
  }

}
