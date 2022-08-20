import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm  }   from '@angular/forms';
import {FrontservicesService} from '../services/frontservices.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public user:any;
form: FormGroup;
submitted=false;
verification=true;
hide = false;
spinner =false;
  constructor( public http: HttpClient,public fb: FormBuilder,private router: Router, private Utilisateurservice: FrontservicesService){
    this.form=this.fb.group({
      email: ['',[ Validators.required]],
      password:['', [Validators.required,Validators.minLength(3) ]],
    })
  }

  get email(){
    return this.form.get('email');
  }get password(){
    return this.form.get('password');
  }

  get formcontrol() {
    return this.form.controls;
    }


  ngOnInit(): void {

  }

  submitLogin2(){


    this.spinner=true;
    setTimeout(() =>{


      this.submitted=true;
  const formdata:any =new FormData();
   formdata.append("email", this.form.controls['email'].value);
   formdata.append("password", this.form.controls['password'].value);

   const httpOptions={
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  };

  this.http.post('http://127.0.0.1:8000/api/login',formdata,httpOptions).subscribe(data=>{
    this.user=data;
    console.log(this.user);
    if(this.user === 0)
    {
      if(this.form.controls['email'].value=="ADMIN" && this.form.controls['password'].value== "@adinsert2022#")
      {
       localStorage.setItem('admin',"actif");
       this.router.navigateByUrl('/acceuil');
      }

      console.log("mauvais email");
      this.verification=false;
    }
    else
    {
    console.log(data);
    localStorage.setItem('identifiant',this.user);
    this.router.navigateByUrl('/acceuil');
    }
  })

      this.spinner=false;


    },5000)

  }

}
