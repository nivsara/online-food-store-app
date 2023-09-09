import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { sample_foods } from 'src/mock-data/food-data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[] {
    return sample_foods;
  }

  getAllFoodsbySearch(searchTerm: string): Food[] {
    return this.getAll().filter((item: Food) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getFoodById( id: string) : Food {
    return this.getAll().find((item: Food) => item.id === id) ?? new Food;
  }
}
