import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import {faSearch, faShoppingBasket, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faInstagram, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons';

import {ProductService} from './../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  faSearch = faSearch;
  faShoppingBasket = faShoppingBasket;
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faUserEdit = faUserEdit;
  username: String = null;
  validUser: Boolean = false;
  addProduct: Boolean = false;
  products = {};

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productService.getProducts();

    this.productService.getProductsStatusListener().subscribe(
      data=>{
        this.products = data["products"];
      }
    )
  }

  onClick(){
    this.addProduct = true;
  }

}
