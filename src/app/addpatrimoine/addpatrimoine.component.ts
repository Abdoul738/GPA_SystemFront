import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, NgZone, Injectable } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import {FrontservicesService} from '../services/frontservices.service';
import { FormGroup, FormControl, Validators, FormBuilder  }   from '@angular/forms';
import { Patrimoine } from '../interfaces/patrimoine';
import { NoopAnimationPlayer } from '@angular/animations';
import { __values } from 'tslib';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import {DateAdapter} from '@angular/material/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { combineLatest } from 'rxjs';
import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-addpatrimoine',
  templateUrl: './addpatrimoine.component.html',
  styleUrls: ['./addpatrimoine.component.css'],
  providers: [
  ],
})

export class AddpatrimoineComponent implements OnInit {

  latitude: number = 12.341731853681724;
  longitude: number = -1.4921732960342848;
  address: any;
  private geoCoder:any;
  public patrimoine: any;
  public url: any;
  public url2: any;
  form: FormGroup;
  echeancepat: FormGroup;
  public username: any;
  connected= false;
  submitted = true;


  @ViewChild('search')
  public searchElementRef!: ElementRef;
  imgbefore: string="";
  imgafter: string="";

  constructor(private imageCompress:NgxImageCompressService, public fb: FormBuilder, private router: Router, private Utilisateurservice: FrontservicesService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public http: HttpClient) {

    this.echeancepat = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    this.form=this.fb.group({
      imgpat:null,
      nompat:['', Validators.required ],
      descpat: ['', Validators.required ],
      typepat: ['', Validators.required ],
      entpat: ['', Validators.required ],
      chfequippat: ['', Validators.required ],
      planfilepat: null,
      payspat: ['', Validators.required ],
      villepat: ['', Validators.required ],
      lat: [""],
      lng: [""],
      echeancepat: [this.echeancepat.value, Validators.required ],
      start:['',Validators.required],
      end: ['', Validators.required ],
      idUser: [],
    })
   }

   get all() {
    return this.form.controls;
    }


  ngOnInit(): void {
    this.getusername();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
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

getusername(){
  this.username=localStorage.getItem('identifiant');
  console.log(this.username);
  if(this.username!=null)
  {
    this.connected=true;
  }
  console.log(this.connected)
}


get nompat(){
  return this.form.get('nompat');
}get descpat(){
  return this.form.get('descpat');
}
get start(){
  return this.form.get('start');
}
get end(){
  return this.form.get('end');
}get typepat(){
  return this.form.get('typepat');
}get entpat(){
  return this.form.get('entpat');
}get chfequippat(){
  return this.form.get('chfequippat');
}get payspat(){
  return this.form.get('payspat');
}get villepat(){
  return this.form.get('villepat');
}get lat(){
  return this.form.get('lat');
}get lng(){
  return this.form.get('lng');
}get idUser(){
  return this.form.get('idUser');
}

private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }
}


markerDragEnd($event: MouseEvent) {
  console.log($event);
  this.latitude = $event.coords.lat;
  this.longitude = $event.coords.lng;
}

addMarker(lat: number, lng: number) {
  this.latitude = lat;
  this.longitude = lng;
  }

  /*submitPatrimoine(form: NgForm){
    console.log(form.value);
    this.Utilisateurservice.addPatrimoine(form.value).subscribe(data=>{
      this.patrimoine = data;
      console.log(this.patrimoine);
    })
  }


test()
{
  this.imageCompress.uploadFile().then(
    ({image,orientation})=>{

      this.imgbefore=image;
      console.log(this.imageCompress.byteCount(image))

      this.imageCompress.compressFile(image,orientation,50,50).then( (compressimage)=>{
      this.imgafter=compressimage;
      console.log(this.imgafter)
      console.log(this.imageCompress.byteCount(compressimage))
      })

      })

}

onchange(event:any){

  let image:any=event.target.files[0];

  this.imgbefore=image;
  console.log(this.imgbefore)
  console.log(this.imageCompress.byteCount(this.imgbefore))

  this.imageCompress.compressFile(this.imgbefore,50,50).then( (compressimage)=>{
  this.imgafter=compressimage;
  console.log(this.imgafter)
  console.log(this.imageCompress.byteCount(compressimage))
  })

}

*/

  submitPatrimoine2(){

    this.submitted = true;
   const formdata:any =new FormData();
   formdata.append("imgpat", this.form.controls['imgpat'].value);
   formdata.append("nompat", this.form.controls['nompat'].value);
   formdata.append("descpat", this.form.controls['descpat'].value);
   formdata.append("typepat", this.form.controls['typepat'].value);
   formdata.append("entpat", this.form.controls['entpat'].value);
   formdata.append("chfequippat", this.form.controls['chfequippat'].value);
   formdata.append("planfilepat", this.form.controls['planfilepat'].value);
   formdata.append("payspat", this.form.controls['payspat'].value);
   formdata.append("villepat", this.form.controls['villepat'].value);
   formdata.append("lat", this.form.controls['lat'].value);
   formdata.append("lng", this.form.controls['lng'].value);
   formdata.append("idUser", this.form.controls['idUser'].value);
   formdata.append("echeancepat", this.echeancepat.value.start.toISOString().slice(0,10)+  ' au '  +this.echeancepat.value.end.toISOString().slice(0,10));

   const httpOptions={
     headers: new HttpHeaders({
       'Accept': 'application/json'
     })
   };

   if(this.http.post('http://127.0.0.1:8000/api/saveP',formdata,httpOptions).subscribe({
     next: (v) => console.log('success: ',v)
   })){
      Swal.fire(
        'success!!!',
        'Le patrimoine a été enregistré et sera visible lorsque l\'administrateur l\'aura valider.'
      )
      this.router.navigateByUrl('/acceuil');
    }

   console.log([...formdata]);
  }

  readUrl2(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url2 = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }

  }

  handeFileInput(event:Event){
  const file= (event.target as HTMLInputElement)?.files?.[0];
  this.form.patchValue({
    imgpat:file
  })
  }

  handeFileInput2(event:Event){
    const file= (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      planfilepat:file
    })
    }

}
