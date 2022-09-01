import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  template: `<ejs-chart id='chart-container'></ejs-chart>`,
})

export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
