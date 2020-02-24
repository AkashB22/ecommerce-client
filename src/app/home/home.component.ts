import { Component, OnInit } from '@angular/core';
import {faQuestion, faSeedling, faRocket, faUserShield, faSearch, faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {NgsRevealConfig} from 'ngx-scrollreveal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgsRevealConfig]
})
export class HomeComponent implements OnInit {

  constructor(private ngsRevealConfig: NgsRevealConfig) { 
    ngsRevealConfig.duration = 1000;
  }

  faQuestion = faQuestion;
  faSeedling = faSeedling;
  faRocket = faRocket;
  faUserShield = faUserShield;
  faSearch = faSearch;
  faSlidersH = faSlidersH;

  ngOnInit() {
  }

}
