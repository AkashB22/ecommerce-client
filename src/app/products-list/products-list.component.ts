import { Component, OnInit } from '@angular/core';
import {faShoppingCart, faHeart, faRandom, faSearch, faRupeeSign} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor() { }

  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faRandom = faRandom;
  faSearch = faSearch;
  faRupeeSign = faRupeeSign;

  ngOnInit() {
  }

}
