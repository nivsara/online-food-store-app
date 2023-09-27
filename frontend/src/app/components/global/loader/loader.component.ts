import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading!: boolean;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.isLoading().subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

}
