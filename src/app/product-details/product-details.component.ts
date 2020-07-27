import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  product : {
    averageRating: number
  };
  imageBase64: [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private elementRef: ElementRef) { }

  faMapMarkerAlt = faMapMarkerAlt;
  faRupeeSign = faRupeeSign;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faRStar = faRStar;
  faCheckSquare = faCheckSquare;
  faTicketAlt = faTicketAlt;
  faCartPlus = faCartPlus;
  @ViewChild('dropdownName', { static: false})dropdownName: ElementRef;

  ngOnInit() {
    this.route.params.subscribe(
      params=>{
        this.productId = params["id"];
        this.productService.getProductById(this.productId).subscribe(
          data=>{
            this.product = data["product"];
            this.imageBase64 = data["imageBase64Path"]
            // console.log(this.imageBase64);
          },
          error=>{
            console.log(error);
          }
        )
      }
    )
  }

  stopPropagetion(event){
    this.dropdownName.nativeElement.querySelector('.dropdown-menu').classList.add('show');
    event.stopPropagation();
  }

  clickDropDownHandler(event){
    this.dropdownName.nativeElement.querySelector('#dropdownMenuLink').text = event.target.text;
    this.dropdownName.nativeElement.classList.add('show');
    this.dropdownName.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
    console.log(this.dropdownName.nativeElement.querySelector('#dropdownMenuLink').setAttribute("aria-expanded", false));
    event.stopPropagation();
  }

  counter(i: number) {
    return new Array(i);
  }

  isDecimal(n: number){
    if((n*10).toString() === n.toString() + "0"){
      return false;
    } else{
      return true;
    }
  }

  noStar(n: number){
    return 5 - (this.isDecimal(this.product.averageRating) ? this.product.averageRating - 1 :this. product.averageRating);
  }
}
