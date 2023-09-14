import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-results-not-found',
  templateUrl: './results-not-found.component.html',
  styleUrls: ['./results-not-found.component.scss']
})
export class ResultsNotFoundComponent implements OnInit {

  @Input() visible:boolean = false;
  @Input() notFoundMessage: string = 'Oops! Looks like it\'s empty';
  @Input() redirectionLinkText: string = 'Go To Home';
  @Input() redirectionLink: string = '/';

  constructor() { }

  ngOnInit(): void {
  }

}
