import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import { sample_foods, sample_tags } from 'src/mock-data/food-data';

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

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getFoodByTag( tag: string) : Food[] {
    return tag === 'All' ? this.getAll() : this.getAll().filter((item: Food) => item.tags?.includes(tag));
  }
}
