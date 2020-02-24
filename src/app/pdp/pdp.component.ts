import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css'],
  providers: [NgbCarouselConfig]
})
export class PdpComponent implements OnInit {

  constructor(private carouselConfigs: NgbCarouselConfig) {
    carouselConfigs.interval = 3000;
   }

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  slides = [
    {img: 'assets/image/bg-10.jpg'},
    {img: 'assets/image/bg-17.jpg'},
    {img: 'assets/image/bg-28.jpg'},
  ];

  slideConfig = {
    "autoplay": true,
    "autoplaySpeed": 3000,
    "slidesToShow": 1, 
    "slidesToScroll": 1,
    "prevArrow": ".site-slider .slider-btn .prev",
    "nextArrow": ".site-slider .slider-btn .next",
    "dots":true,
  };  

  slides2 = [
    {img: 'assets/image/bg-10.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-17.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-28.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-10.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-17.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-28.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-10.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-17.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-28.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-10.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-17.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-28.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-10.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-17.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-28.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-10.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-17.jpg', name: 'olive oil'},
    {img: 'assets/image/bg-28.jpg', name: 'olive oil'},
  ];

  slideTwoConfig = {
    "autoplay": true,
    "autoplaySpeed": 5000,
    "slidesToShow": 5, 
    "slidesToScroll": 1,
    "prevArrow": ".site-slider-two .slider-btn-two .prev",
    "nextArrow": ".site-slider-two .slider-btn-two .next",
    "dots":false,
  };

  ngOnInit() {
  }

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
}
