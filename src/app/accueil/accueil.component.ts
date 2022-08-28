import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm  }   from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service'
import { Utilisateur } from '../interfaces/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  public actualprogram: any;

  constructor(public http: HttpClient,public fb2: FormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) 
  {
    this.http.get('http://127.0.0.1:8000/api/getactualprogram').subscribe(data => {
      console.log(data);
      this.actualprogram = data;
    });
  }

  ngOnInit(): void {
  }

}
