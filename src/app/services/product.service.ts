import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  productsUpdated = new Subject<any>();
  ProductsErrorListener = new Subject<any>();
  productUpdated = new Subject<any>();
  productsUrl = `http://localhost:3001/products`;
  products = [];

  getProducts(){
    this.http.get(this.productsUrl)
      .subscribe(
        response=>{
          console.log("got data from get products api");
          this.products = response["products"];
          console.log(this.products);
          this.productsUpdated.next([...this.products]);
        }, 
        error=>{
          this.ProductsErrorListener.next(error);
        }
      )
  }

  getProductById(id){
    return this.http.get(`${this.productsUrl}/${id}`);
  }


  getProductsUpdatedListener(){
    return this.productsUpdated.asObservable()
  }

  getProductsErrorStatusListener(){
    return this.ProductsErrorListener.asObservable();
  }

  addProduct(product){
    this.http.post(this.productsUrl, product)
      .subscribe(
        response=>{
          this.products.push(response["product"]);
          this.productsUpdated.next([...this.products]);
        }
      )
  }

  deleteProduct(id){
    this.http.delete(`${this.productsUrl}/${id}`)
      .subscribe(data=>{
        const updatedProducts = this.products.filter(p => p._id !== id);
        this.products = updatedProducts;
        this.productsUpdated.next([...this.products]);
      }); 
  }

  updateProduct(id, product){
    this.http.put(`${this.productsUrl}/${id}`, product)
    .subscribe(
      data=>{
        console.log("data updated");
        const updatedProducts = [...this.products];
        const oldProductIndex = updatedProducts.findIndex(p => p._id === id);
        updatedProducts[oldProductIndex] = data["product"];
        this.products = updatedProducts;
        console.log(this.products);
        this.productsUpdated.next([...this.products]);
        this.productUpdated.next(data);
      }
    )
  }

  getUpdatedStatus(){
    return this.productUpdated.asObservable();
  }
}
