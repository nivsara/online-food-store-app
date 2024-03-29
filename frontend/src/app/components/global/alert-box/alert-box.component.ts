import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {

  @Input() alertInfo: any = null;
  showAlert: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.showAlert = false;
  }
}
