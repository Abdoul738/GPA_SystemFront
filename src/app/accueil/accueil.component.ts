import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder,NgForm  }   from '@angular/forms';
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
  form: UntypedFormGroup;
  form1: UntypedFormGroup;
  data:any;
  rapport:any;
  ActToupdate:any;
  spinner= false;
  block= false;
  color=false;

  constructor(public http: HttpClient,public fb2: UntypedFormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) 
  {
    this.form=this.fb2.group({
      capteur_id: ['', ''],
      date_analyse: ['', ''],
      img_url: ['', ''],
    });
    this.form1=this.fb2.group({
      program_id: ['', ''],
      user_id: ['', ''],
      rapprot_content: ['', ''],
    });
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/api/getactualprogram').subscribe(data => {
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
      formdata.append("image_url", this.form.controls['img_url'].value);

      const httpOptions={
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    this.http.post('https://dae2-197-239-76-109.eu.ngrok.io/api/addanalyse/',formdata,httpOptions).subscribe(data=>{
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
          this.http.get('http://127.0.0.1:8000/api/getdaylyprogramprogress').subscribe(data1=>{
            if(data != null && data1 != null){
              window.location.reload();
            }
          })
        })
      }
    })
  }

  // Start popup
  MoitierValid_displayStyle = "none";
  ProgramList_displayStyle = "block";

  openMoitierValid_Popup(id:any) {
    this.getActById(id);
    this.MoitierValid_displayStyle = "block";
    this.ProgramList_displayStyle = "none";
  }
  closeMoitierValid_Popup() {
    this.MoitierValid_displayStyle = "none";
    this.ProgramList_displayStyle = "block";
  }

  getActById(id:any){
    this.Utilisateurservice.getprogramactbyid(id).subscribe(data => {
      this.ActToupdate = data;
    });
  }

  get FormControl1() {
    return this.form1.controls;
  }

  submiterapport(user_id:any, prog_id: any){

    this.spinner=true;
    setTimeout(() => {

      const formdata1:any =new FormData();

      console.log(prog_id);
      console.log(user_id);
      console.log(this.form1.controls['rapprot_content'].value);

      formdata1.append("prog_id", prog_id);
      formdata1.append("usr_id", user_id);
      formdata1.append("body", this.form1.controls['rapprot_content'].value);


      const httpOptions={
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };

      this.http.post('http://127.0.0.1:8000/api/addrapport/', formdata1,httpOptions).subscribe(data=>{
      this.rapport = data;
      console.log(data);
      })

      if(this.rapport=0)
      {
        Swal.fire({
          title: 'Erreur !!!',
          text: 'Modification non enregistrée.',
          icon: 'error',
        })
      this.ngOnInit();
      }
      else
      {
        Swal.fire({
          title: 'success !!!',
          text: 'Modification enregistré',
          icon: 'success',
        })
      }


        this.spinner=false;
        this.closeMoitierValid_Popup();
        // window.location.reload();
    },1500)
  }
}
