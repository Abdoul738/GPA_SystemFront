import { __values } from 'tslib';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormArray  }   from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {FrontservicesService} from '../services/frontservices.service'
import { Utilisateur } from '../interfaces/utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  submitted: any;
  selection= false;
  saisi = false;
  activites:any;
  spinner= false;
  libAct: any;
  allusers:any;
  week:any;

  constructor( public http: HttpClient,public fb2: FormBuilder,private router: Router, private Utilisateurservice: FrontservicesService) {
    this.form = this.fb2.group({
      name: '',
      quantities: this.fb2.array([]) ,
    });
    this.form1=this.fb2.group({
      userid: [''],
      libelleactivite: [''],
      date: [''],
      statut: [''],
    },

    )

    this.getalluser();
    this.getactivites();
    this.select();
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

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
   // End popup

  getalluser() {
    this.Utilisateurservice.getalluser().subscribe(data => {
      this.allusers = data;
    })
  }

  getactivites() {
    this.Utilisateurservice.getactivites().subscribe(data => {
      this.listactivites = data;
    })
  }

  getweek() {
    this.Utilisateurservice.getweek().subscribe(data => {
      this.week = data;
      console.log(this.week);
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

  submitProgramme() {

    // this.submitted = true;
    this.spinner = true;
    setTimeout(() => {

      const formdata: any = new FormData();
      const formdata1: any = new FormData();

      formdata.append("libelleactivite", this.form1.controls['libelleactivite'].value);
      
      formdata1.append("user_id", this.form1.controls['userid'].value);
      formdata1.append("activite_id", this.form1.controls['libelleactivite'].value);
      formdata1.append("date", this.form1.controls['date'].value);
      formdata1.append("statut",0);

      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };

      if(this.saisi = true){
        this.http.post('http://127.0.0.1:8000/api/createactivite', formdata, httpOptions).subscribe(data => {
        this.activites = data;  

        formdata1.append("activite_id",this.activites);

        this.http.post('http://127.0.0.1:8000/api/createprogramme', formdata1, httpOptions).subscribe(data => {
        })
        
        })
      }else{
        this.http.post('http://127.0.0.1:8000/api/createprogramme', formdata1, httpOptions).subscribe(data => {
          console.log(data);
        })
      }

      this.spinner = false;

    }, 3000)

  }
  
}
