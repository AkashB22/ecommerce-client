import { Component, OnInit } from '@angular/core';
import {faMapMarkerAlt, faRupeeSign, faStar, faStarHalfAlt, faTicketAlt, faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {faStar as faRStar, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }

  faMapMarkerAlt = faMapMarkerAlt;
  faRupeeSign = faRupeeSign;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faRStar = faRStar;
  faCheckSquare = faCheckSquare;
  faTicketAlt = faTicketAlt;
  faCartPlus = faCartPlus;

  ngOnInit() {
  }

}
