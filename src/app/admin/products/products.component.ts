import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

import {faSearch, faShoppingBasket, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faInstagram, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons';



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
  hid: Boolean = false

  constructor(private router: Router) { 
    router.events.pipe(
      filter(e => e instanceof RouterEvent)
    ).subscribe(e => {
        if((typeof(e['url']) === 'string' && e['url'] === "/admin/products")){
          this.hid = false;
        } else{
          this.hid = true;
        }
      })
  }

  ngOnInit() {
  }

}
