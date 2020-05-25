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

  products = [];

  ngOnInit() {
    this.productService.getProducts();

    this.productService.getProductsStatusListener().subscribe(
      data=>{
        this.products = data["products"];
      }
    )
  }

}
