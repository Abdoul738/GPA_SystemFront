import { Patrimoine } from './../interfaces/patrimoine';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service';
import { ConstantPool } from '@angular/compiler';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-detailpatrimoine',
  templateUrl: './detailpatrimoine.component.html',
  styleUrls: ['./detailpatrimoine.component.css']
})
export class DetailpatrimoineComponent implements OnInit {
  blocage= false;
  admin: any;
  latitude: any;
  longitude: any ;
  patrimoines: any;
  id: any;
  username: any ;
  connected= false;
  form: FormGroup;
  submitted = true;
  imagepath:any= 'http://127.0.0.1:8000/api/images/';
  totalcomments: any;
  comments: any;
  userdetails: any;

  constructor(private ngZone: NgZone,public fb:FormBuilder,private router:Router,private aroute:ActivatedRoute,private Utilisateurservice:FrontservicesService,public http: HttpClient) {

    this.form=this.fb.group({
      userid:['', Validators.required ],
      patid:['', Validators.required ],
      comment:['', Validators.required ],
      username:['', Validators.required ],
      parentid:null,
    })

   }

   get all() {
    return this.form.controls;
    }


  ngOnInit(): void {

    this.getusername();

    this.aroute.queryParams.subscribe((params)=>{
      this.id=params['id'];
      console.log(this.id)
    })

this.Utilisateurservice.getapatrimoine(this.id).subscribe(data=>{
  this.patrimoines = data;
  console.log(this.patrimoines);
})
this.getlat();
this.getlong();
this.getcommentnumber();
this.getcomments();
this.getuser();
  }

  getcommentnumber(){

    this.aroute.queryParams.subscribe((params)=>{
      this.id=params['id'];
      console.log(this.id)
    })

    this.Utilisateurservice.getcommentsnumber(this.id).subscribe(data=>{
      this.totalcomments = data;
      console.log(this.totalcomments);
    })
   }

   getlat()
   {

    this.aroute.queryParams.subscribe((params)=>{
      this.id=params['id'];
      console.log(this.id)
    })

this.Utilisateurservice.getlat(this.id).subscribe(data=>{
  this.latitude = data;
  console.log(this.latitude);
})

   }

   getlong()
   {

    this.aroute.queryParams.subscribe((params)=>{
      this.id=params['id'];
      console.log(this.id)
    })

this.Utilisateurservice.getlong(this.id).subscribe(data=>{
  this.longitude = data;
  console.log(this.longitude);
})

   }

   getcomments()
   {
    this.aroute.queryParams.subscribe((params)=>{
      this.id=params['id'];
      console.log(this.id)
    })

    this.Utilisateurservice.getprimarycomment(this.id).subscribe(data=>{
      this.comments = data;
      console.log(this.comments);
    })

   }


  getusername(){
    this.username=localStorage.getItem('identifiant');
    console.log(this.username);

    this.admin=localStorage.getItem('admin');

  if(this.admin!=null)
  {
    this.blocage=true;
    console.log(this.blocage)
  }

    if(this.username!=null)
    {
      this.connected=true;
    }
    console.log(this.connected)
    console.log(this.username)
  }

  deconnexion(){

    Swal.fire({
      title: 'etes vous sur?',
      text: 'Voulez vous vous deconnecter?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui!',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {

        localStorage.removeItem('identifiant');

        Swal.fire(
          'success!',
          'success'
        )


   this.router.navigateByUrl('/login');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'error'
        )
      }
    })
}

deconnexionadmin(){

  Swal.fire({
    title: 'etes vous sur?',
    text: 'Voulez vous vous deconnecter?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui!',
    cancelButtonText: 'Non'
  }).then((result) => {
    if (result.value) {

      localStorage.removeItem('admin');

      Swal.fire(
        'success!',
        'success'
      )


 this.router.navigateByUrl('/login');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Annulé',
        'error'
      )
    }
  })

}

  validerpatrimoine()
  {

    Swal.fire({
      title: 'etes vous sur?',
      text: 'Voulez vous Valider ce patrimoine!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, le valider!',
      cancelButtonText: 'Non, le laisser'
    }).then((result) => {
      if (result.value) {

        this.aroute.queryParams.subscribe((params)=>{
          this.id=params['id'];
          console.log(this.id)
        })

        this.Utilisateurservice.validerpatrimoine(this.id).subscribe(data=>{
          this.patrimoines = data;
          console.log(this.patrimoines);
        })

        Swal.fire(
          'success!',
          'Le patrimoine a été mis a jour.',
          'success'
        )
        this.ngOnInit();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Le patrimoine est resté inchangé',
          'error'
        )
        this.ngOnInit();
      }
    })
  }

  retirerpatrimoine()
  {

    Swal.fire({
      title: 'etes vous sur?',
      text: 'Voulez vous retracter ce patrimoine!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, le retracter!',
      cancelButtonText: 'Non, le garder'
    }).then((result) => {
      if (result.value) {

        this.aroute.queryParams.subscribe((params)=>{
          this.id=params['id'];
          console.log(this.id)
        })

        this.Utilisateurservice.retirerpatrimoine(this.id).subscribe(data=>{
          this.patrimoines = data;
          console.log(this.patrimoines);
        })

        Swal.fire(
          'success!',
          'Le patrimoine a été mis a jour.',
          'success'
        )
        this.ngOnInit();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Le patrimoine est resté inchangé',
          'error'
        )
        this.ngOnInit();
      }
    })
  }


  getuser(){
    this.username=localStorage.getItem('identifiant');

    this.Utilisateurservice.getuser(this.username).subscribe(data=>{
      this.userdetails = data;
      console.log(this.userdetails);
    })

  }

  comment()
  {

    this.submitted = true;
    const formdata:any =new FormData();
    formdata.append("userid", this.form.controls['userid'].value);
    formdata.append("patid", this.form.controls['patid'].value);
    formdata.append("comment", this.form.controls['comment'].value);
    formdata.append("username", this.form.controls['username'].value);
    formdata.append("parentid", this.form.controls['parentid'].value);

    const httpOptions={
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    this.http.post('http://127.0.0.1:8000/api/comment',formdata,httpOptions).subscribe({
      next: (v) => console.log('success: ',v)
    })

    console.log([...formdata]);

  }


}
