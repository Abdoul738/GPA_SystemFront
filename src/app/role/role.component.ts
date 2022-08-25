import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm  }   from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service'
import { Utilisateur } from '../interfaces/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  
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
      libellerole: [''],
      niveau: [''],
    },

    )
   }

  ngOnInit(): void {
  }

  get FormControl() {
    return this.form.controls;
  }

  submitinscription(){

    this.submitted=true;
    this.spinner=true;
    setTimeout(() => {

      const formdata:any =new FormData();

      console.log(this.form.controls['libellerole'].value)
      console.log(this.form.controls['niveau'].value)

      formdata.append("libellerole", this.form.controls['libellerole'].value);
      formdata.append("niveau", this.form.controls['niveau'].value);


     const httpOptions={
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    this.http.post('http://127.0.0.1:8000/api/createrole',formdata,httpOptions).subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })

    if(this.users = 0)
    {
      Swal.fire({
        title: 'Oups !!!',
        text: 'Ce poste existe déjà.',
        icon: 'error',
      })
     this.ngOnInit();
    }

    else
    {
      Swal.fire({
        title: 'success !!!',
        text: 'Nouveau poste enregistré.',
        icon: 'success',
      })
    }

    this.spinner=false;
    this.block=false;

    },3000)


  }

}
