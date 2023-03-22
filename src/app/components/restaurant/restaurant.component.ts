import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {

  @Input() restaurant: any;
  @Input() recipe: any
  constructor() { }

  ngOnInit() {}

  getAddress(address) {
    return address.join(', ');
  }

}
