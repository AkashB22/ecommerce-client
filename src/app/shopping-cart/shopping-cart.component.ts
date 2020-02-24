import { Component, OnInit } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor() { }

  faTrash = faTrash;

  ngOnInit() {
  }

}
