import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,NgForm  }   from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service'
import { Utilisateur } from '../interfaces/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import swal from 'sweetalert';
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
  allusers:any;
  public userToupdate:any;

  constructor( public http: HttpClient,public fb2: FormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) {
    this.form=this.fb2.group({
      nom: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(2)]],
      prenom: ['', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'),Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(8)]],
      role_id: ['', [Validators.required,Validators.minLength(1)]],
      password:['', ''],
    });

    this.getroles();
    this.getalluser();
  }

  ngOnInit(): void {
  }

  getOneUser(id:any){
    this.Utilisateurservice.getuser(id).subscribe(data => {
      this.userToupdate = data;
    });
  }

  getroles(){
    this.Utilisateurservice.getrole().subscribe(data=>{
      this.role = data;
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

    if(this.users=0)
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
      // this.closePopup();
      // this.router.navigateByUrl('/inscription');
    }


        this.spinner=false;
        this.block=false;
        // this.color=false;
      window.location.reload();
    },3000)


  }

  // Start popup
  displayStyle = "none";
  UserUpdate_displayStyle = "none";
  displayStyle1 = "block";

  openUserUpdate_Popup(id:any) {
    this.getOneUser(id);
    this.UserUpdate_displayStyle = "block";
  }
  closeUserUpdatePopup() {
    this.UserUpdate_displayStyle = "none";
  }

  openPopup() {
    this.displayStyle = "block";
    this.displayStyle1 = "none";
  }
  closePopup() {
    this.displayStyle = "none";
    this.displayStyle1 = "block";
  }
  // End popup

  getalluser() {
    this.Utilisateurservice.getalluser().subscribe(data => {
      this.allusers = data;
    })
  }

  submitupdate(id:any){

    this.submitted=true;
    this.spinner=true;
    this.block=true;
    // this.color=true;
    setTimeout(() => {

      this.submitted=true;
      const formdata:any =new FormData();

      formdata.append("id",id);
      formdata.append("nom", this.form.controls['nom'].value);
      formdata.append("prenom", this.form.controls['prenom'].value);
      formdata.append("email", this.form.controls['email'].value);
      formdata.append("numero", this.form.controls['numero'].value);
      formdata.append("role_id", this.form.controls['role_id'].value);
      formdata.append("password", '');


      const httpOptions={
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };

      this.http.post('http://127.0.0.1:8000/api/updateuser/', formdata,httpOptions).subscribe(data=>{
      })

      if(this.users=0)
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
        this.block=false;
        this.closePopup();
        window.location.reload();
    },1500)


  }

  deleteuser(id:any){
    Swal.fire({
      title: 'Attention !!!',
      text: 'Voulez-vous vraiment supprimer ?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Non',
      confirmButtonText: 'Oui'
    }).then((result) => {

      if (result.value) {
        this.Utilisateurservice.deleteuser(id).subscribe(data => {})

        Swal.fire(
          'Confirmer!',
          'Suppression terminée',
          'success'
        )
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler!',
          'Suppression annulée)',
          'error'
        )
      }
    })
  }

}
