import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() order!: Order;
  constructor() { }

  ngOnInit(): void {
  }

}
