import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  connected= false;
  username: any;
  userdetails: any;
  patrimoines: any;
  imagepath:any= 'http://127.0.0.1:8000/api/images/';
  patrimoinenumber: any;

  constructor(public router:Router, private Utilisateurservice:FrontservicesService) { }

  ngOnInit(): void {

    this.getuser();
    this.getusername();

  }

  deconnexion(){
    localStorage.removeItem('user_name');
    this.router.navigate(['/login']);
}

getuser(){
  this.username=localStorage.getItem('identifiant');

  this.Utilisateurservice.getuser(this.username).subscribe(data=>{
    this.userdetails = data;
    console.log(this.userdetails);
  })

  this.Utilisateurservice.getapatrimoinebyuserid(this.username).subscribe(data=>{
    this.patrimoines = data;
    console.log(this.patrimoines);
  })

  this.Utilisateurservice.getpatrimoinebnumber(this.username).subscribe(data=>{
    this.patrimoinenumber = data;
    console.log(this.patrimoinenumber);
  })
}

getusername(){
  this.username=localStorage.getItem('identifiant');
  console.log(this.username);
  if(this.username!=null)
  {
    this.connected=true;
  }
  console.log(this.connected)
}

}
