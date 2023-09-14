import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm = '';
  constructor(activatedRoute: ActivatedRoute, private router: Router) {
      activatedRoute.params.subscribe((param: any)=>{
        this.searchTerm = param?.searchTerm ? param?.searchTerm : '';
    });
  }

  ngOnInit(): void {
  }

  search(term: string) {
    if(term) {
      this.router.navigateByUrl('/search/'+ term);
    }
  }

}
