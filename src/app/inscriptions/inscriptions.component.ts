import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm  }   from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service'
import { Utilisateur } from '../interfaces/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css']
})
export class InscriptionsComponent implements OnInit {

  public users: any;
  role:any;
  verifemail: any;
  form: FormGroup;
  submitted: any;
  spinner= false;
  block= false;
  color=false;
  constructor( public http: HttpClient,public fb2: FormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) {
    this.form=this.fb2.group({
      nom: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(2)]],
      prenom: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(8)]],
      role_id: ['', [Validators.required,Validators.minLength(1)]],
      password:['', ''],
    },

    )
    this.getroles();
   }

  ngOnInit(): void {
  }

  getroles(){
    this.Utilisateurservice.getrole().subscribe(data=>{
      this.role = data;
      console.log(this.role);
    })
  }

  get FormControl() {
    return this.form.controls;
  }

  submitinscription(){

    this.submitted=true;
    this.spinner=true;
    this.block=true;
    // this.color=true;
    setTimeout(() => {

      this.submitted=true;
      const formdata:any =new FormData();

      console.log(this.form.controls['nom'].value)
      console.log(this.form.controls['prenom'].value)
      console.log(this.form.controls['email'].value)
      console.log(this.form.controls['numero'].value)
      console.log(this.form.controls['role_id'].value)


      formdata.append("email", this.form.controls['email'].value);
      formdata.append("password", '');
      formdata.append("nom", this.form.controls['nom'].value);
      formdata.append("prenom", this.form.controls['prenom'].value);
      formdata.append("numero", this.form.controls['numero'].value);
      formdata.append("role_id", this.form.controls['role_id'].value);


     const httpOptions={
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    this.http.post('http://127.0.0.1:8000/api/registerUser',formdata,httpOptions).subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })

    if(this.users!=0)
    {
      Swal.fire({
        title: 'Oups?',
        text: 'Il semblerait que votre enregistrement ait rencontré un probléme',
        icon: 'error',
      })
     this.ngOnInit();
    }

    else
    {
      Swal.fire({
        title: 'success !!!',
        text: 'Le nouvel utilisateur été enregistrer',
        icon: 'success',
      })
    //  this.router.navigateByUrl('/accueil');
    }


        this.spinner=false;
        this.block=false;
        // this.color=false;

    },3000)


  }

}
