import { Component, OnInit } from '@angular/core';
import {faQuestion, faSeedling, faRocket, faUserShield, faSearch, faSlidersH} from '@fortawesome/free-solid-svg-icons';
import {NgsRevealConfig} from 'ngx-scrollreveal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [NgsRevealConfig]
})
export class MainComponent implements OnInit {

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
