import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() foodRating!: number;
  @Input() readOnly: boolean = false;
  ratingStars: number = 5;
  ratings!: number[];
  Math = Math;
  constructor() { }

  ngOnInit(): void {
    this.ratings = Array(this.ratingStars)
    .fill(1)
    .map((x, i) => i);
  }

}
