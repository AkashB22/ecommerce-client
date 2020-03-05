import { Component, OnInit } from '@angular/core';
import {faCheckCircle, faThumbsUp, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  constructor() { }

  faCheckCircle = faCheckCircle;
  faThumbsUp = faThumbsUp;
  faTrash = faTrash;

  ngOnInit() {
  }

}
