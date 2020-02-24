import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor() { }

  private events = [
    {
      name: 'event1',
      description: 'event desc',
      date: new Date()
    },
    {
      name: 'event1',
      description: 'event desc',
      date: new Date()
    },{
      name: 'event1',
      description: 'event desc',
      date: new Date()
    },
    {
      name: 'event1',
      description: 'event desc',
      date: new Date()
    },
    {
      name: 'event1',
      description: 'event desc',
      date: new Date()
    },
    {
      name: 'event1',
      description: 'event desc',
      date: new Date()
    },
    {
      name: 'event1',
      description: 'event desc',
      date: new Date()
    },
    {
      name: 'event1',
      description: 'event desc',
      date: new Date()
    }
  ]
  ngOnInit() {
  }

}
