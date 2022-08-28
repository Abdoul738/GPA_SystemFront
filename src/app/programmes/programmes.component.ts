import { __values } from 'tslib';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormArray  }   from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FrontservicesService} from '../services/frontservices.service'
import { Utilisateur } from '../interfaces/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MatProgressBarModule}from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {
  name = 'Angular';

  public users: any;
  listactivites: any;
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  submitted: any;
  selection= false;
  saisi = false;
  activites:any;
  spinner= false;
  libAct: any;
  allusers:any;
  allprogrammes:any;
  TitreProgramme:any;
  titre_id:any;

  constructor( public http: HttpClient,public fb2: FormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) {
    this.form = this.fb2.group({
      name: '',
      quantities: this.fb2.array([]) ,
    });
    this.form3 = this.fb2.group({
      titreprogramme: [''],
      process: [''],
    });
    this.form2 = this.fb2.group({
      libelleactivite: [''],
    });
    this.form1=this.fb2.group({
      titre_id: [''],
      userid: [''],
      libelleactivite: [''],
      date: [''],
      statut: [''],
    },

    )

    this.getalluser();
    this.getallprogramme();
    this.getactivites();
    this.select();
    this.getweek();
  }

  ngOnInit(): void {
  }

  // Start dynamic array
  quantities() : FormArray {
    return this.form.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb2.group({
      qty: '',
      price: '',
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log(this.form.value);
  }
  // End dynamic array

  // Start popup
  displayStyle = "none";
  displayStyle1 = "block";

  openPopup() {
    this.displayStyle = "block";
    this.displayStyle1 = "none";
  }
  closePopup() {
    this.displayStyle = "none";
    this.displayStyle1 = "block";
    window.location.reload();
  }
   // End popup

  getalluser() {
    this.Utilisateurservice.getalluser().subscribe(data => {
      this.allusers = data;
    })
  }

  getallprogramme() {
    this.Utilisateurservice.getallprogramme().subscribe(data => {
      this.allprogrammes = data;
    })
  }

  getactivites() {
    this.Utilisateurservice.getactivites().subscribe(data => {
      this.listactivites = data;
    })
  }

  getweek() {
    this.Utilisateurservice.getweek().subscribe(data => {
      this.TitreProgramme = data;
    })
  }

  select(){
    this.selection = true;
    this.saisi = false;
  }

  saisir(){
    this.selection = false;
    this.saisi = true;
  }

  get FormControl() {
    return this.form.controls;
  }
  get FormControl1() {
    return this.form1.controls;
  }
  get FormControl2() {
    return this.form2.controls;
  }
  get FormControl3() {
    return this.form3.controls;
  }

  submitProgramme() {

    // this.submitted = true;
    this.spinner = true;

    const formdata: any = new FormData();
    const formdata1: any = new FormData();
    const formdata2: any = new FormData();
    const formdata3: any = new FormData();

    formdata2.append("libelleactivite", this.form1.controls['libelleactivite'].value);
    
    formdata1.append("user_id", this.form1.controls['userid'].value);
    formdata1.append("activite_id", this.form1.controls['libelleactivite'].value);
    formdata1.append("date", this.form1.controls['date'].value);
    formdata1.append("statut",0);

    formdata3.append("titreprogramme",this.TitreProgramme);
    formdata3.append("progress",0);

    console.log(this.TitreProgramme);
    console.log(this.form1.controls['libelleactivite'].value);
    console.log(this.form1.controls['userid'].value);
    console.log(this.form1.controls['date'].value);

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    this.http.post('http://127.0.0.1:8000/api/createtitreprogramme', formdata3, httpOptions).subscribe(data => {
      this.titre_id = data;  
      console.log(this.titre_id);
      formdata1.append("titre_id",this.titre_id);

      if(this.saisi = true){
        this.http.post('http://127.0.0.1:8000/api/createactivite', formdata2, httpOptions).subscribe(data => {
        this.activites = data;  

        formdata1.append("activite_id",this.activites);

        this.http.post('http://127.0.0.1:8000/api/createprogramme', formdata1, httpOptions).subscribe(data => {
          if(data != null){
            this.http.get('http://127.0.0.1:8000/api/getprogramprogres/'+this.titre_id).subscribe(data => {
              console.log(data);
            });
          }
        })
        
        })
      }else{
        this.http.post('http://127.0.0.1:8000/api/createprogramme', formdata1, httpOptions).subscribe(data => {
          console.log(data);
          if(data != null){
            this.http.get('http://127.0.0.1:8000/api/getprogramprogres/'+this.titre_id).subscribe(data => {
              console.log(data);
            });
          }
        })
      }
    })

    this.spinner = false;

  }
  
}
