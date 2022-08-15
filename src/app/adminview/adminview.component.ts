import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.css']
})
export class AdminviewComponent implements OnInit {
  connected= false;
  public username: any;
  blocage= false;
  admin: any;
  patrimoine: any;
  imagepath:any= 'http://127.0.0.1:8000/api/images/';
  constructor(private aroute:ActivatedRoute, private router:Router, private Utilisateurservice:FrontservicesService) { }

  ngOnInit(): void {
    this.getusername();
    this.getpatrimoines();
  }

redirect(id:number)
{
  console.log(id)
  this.router.navigate(['/detailpatrimoine'], { queryParams: {id: id}})
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
}


getpatrimoines(){
  this.Utilisateurservice.getpatrimoines().subscribe(data=>{
    this.patrimoine = data;
    console.log(this.patrimoine);
  })
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

}
