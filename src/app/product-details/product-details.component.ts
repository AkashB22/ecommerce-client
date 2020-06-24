import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {faMapMarkerAlt, faRupeeSign, faStar, faStarHalfAlt, faTicketAlt, faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {faStar as faRStar, faCheckSquare} from '@fortawesome/free-regular-svg-icons';

import {ProductService} from './../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId : string;
  product : {};
  imageBase64: [];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  faMapMarkerAlt = faMapMarkerAlt;
  faRupeeSign = faRupeeSign;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faRStar = faRStar;
  faCheckSquare = faCheckSquare;
  faTicketAlt = faTicketAlt;
  faCartPlus = faCartPlus;

  ngOnInit() {
    this.route.params.subscribe(
      params=>{
        this.productId = params["id"];
        this.productService.getProductById(this.productId).subscribe(
          data=>{
            this.product = data["product"];
            this.imageBase64 = data["imageBase64Path"]
            console.log(this.imageBase64);
          },
          error=>{
            console.log(error);
          }
        )
      }
    )
  }

}
