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
  programValid:any;
  form: FormGroup;
  data:any;

  constructor(public http: HttpClient,public fb2: FormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) 
  {
    this.form=this.fb2.group({
      capteur_id: ['', ''],
      date_analyse: ['', ''],
      rslt_analyse: ['', ''],
      sugt_analyse: ['', ''],
      img_url: ['', ''],
    });
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/api/getactualprogram').subscribe(data => {
      console.log(data);
      this.actualprogram = data;
    });
  }

  get FormControl() {
    return this.form.controls;
  }

  submitdata(){

      const formdata:any =new FormData();

      console.log(this.form.controls['capteur_id'].value)
      console.log(this.form.controls['date_analyse'].value)
      console.log(this.form.controls['img_url'].value)


      formdata.append("capt_id", this.form.controls['capteur_id'].value);
      formdata.append("date", this.form.controls['date_analyse'].value);
      formdata.append("rslt",'');
      formdata.append("image_url", this.form.controls['img_url'].value);

      const httpOptions={
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    this.http.post('http://127.0.0.1:8001/api/addanalyse/',formdata,httpOptions).subscribe(data=>{
      this.data = data;
      console.log(this.data);
    })
    if(this.data=0)
    {
      Swal.fire({
        title: 'Oups?',
        text: 'Cet utilisateur existe déjà.',
        icon: 'error',
      })
     this.ngOnInit();
    }
    else
    {
      Swal.fire({
        title: 'success !!!',
        text: 'Nouvel utilisateur enregistré',
        icon: 'success',
      })
    }
  }

  validprogram(id:any, titre_id: any){
    this.Utilisateurservice.validact(id).subscribe(data => {
      this.programValid = data;
      if(this.programValid = 1){
        this.Utilisateurservice.updateprogprogres(titre_id).subscribe(data => {
          if(data != null){
            window.location.reload();
          }
        })
      }
    })
  }
}
