import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder,NgForm  }   from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service'
import { Utilisateur } from '../interfaces/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {ChartDataset, ChartOptions } from 'chart.js';
import { Color } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  template: `<ejs-chart id='chart-container'></ejs-chart>`,
})

export class DashboardComponent implements OnInit {
  // public alldaysweek:any = '';
  public alldaysweek:any;
  public lastweekdatas:any;
  public actualweekdatas:any;
  

  public lineChartLabels: BaseChartDirective["labels"];

  
  
  

  public lineChartOptions = {
    responsive: true,
  };

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public lineChartData:BaseChartDirective["labels"] = [];

  constructor(public http: HttpClient,public fb2: UntypedFormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/api/getallweekdays').subscribe(data=>{
      this.alldaysweek = data;
    })

    this.http.get('http://127.0.0.1:8000/api/getlastweekdatas').subscribe(data=>{
      this.lastweekdatas = data;

      this.http.get('http://127.0.0.1:8000/api/getactualweekdatas').subscribe(data1=>{
        this.actualweekdatas = data1;

        this.lineChartData = [
          { data: this.lastweekdatas, label: 'Semaine derniere' },
          { data: this.actualweekdatas, label: 'Semaine en cours' },
        ];
      })
    })

  }

}
