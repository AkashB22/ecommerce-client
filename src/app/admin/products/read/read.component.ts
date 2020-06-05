import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import {ProductService} from './../../../services/product.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private productService : ProductService) { }
  
  private productsSub : Subscription;
  products = [];

  ngOnInit() {
    this.productService.getProducts();
    this.productsSub = this.productService.getProductsUpdatedListener().subscribe(
      data=>{
        console.log("data", data);
        this.products = data;
      }
    )
  }

  ngOnDestroy(){
    this.productsSub.unsubscribe();
  }

}
