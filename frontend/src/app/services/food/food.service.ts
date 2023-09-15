import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from 'src/app/shared/constants/urls';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import { sample_foods, sample_tags } from 'src/mock-data/food-data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsbySearch(searchTerm: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getFoodById(id: string) : Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + id);
  }

  getAllTags(): Observable<Tag[]> {
    return  this.http.get<Tag[]>(FOODS_TAGS_URL);;
  }

  getFoodByTag( tag: string) : Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }
}
