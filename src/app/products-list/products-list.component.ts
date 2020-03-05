import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {faShoppingCart, faHeart, faRandom, faSearch, faRupeeSign} from '@fortawesome/free-solid-svg-icons';

import {ProductService} from './../services/product.service';
import {Product} from './../models/product.js';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  productsStatusListenerSub : Subscription;
  productsErrorStatusListenerSub : Subscription;
  products: [Product];
  isError = false;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faRandom = faRandom;
  faSearch = faSearch;
  faRupeeSign = faRupeeSign;

  ngOnInit() {
    this.productService.getProducts();
    this.productsStatusListenerSub = this.productService.getProductsStatusListener()
      .subscribe(response=>{
        this.products = response.products;
        this.products.map(product=>{
          for(let i=0; i<product.imagePath.length; i++){
            product.imagePath[i] = 'assets/image/' + product.imagePath[i];
          }
          return product;
        })
        console.log(this.products);
      })

    this.productsErrorStatusListenerSub = this.productService.getProductsErrorStatusListener()
      .subscribe(error=>{
        console.log(error);
        this.isError = true;
      })
  }

  ngOnDestroy(){
    this.productsStatusListenerSub.unsubscribe();
    this.productsErrorStatusListenerSub.unsubscribe();
  }

}
