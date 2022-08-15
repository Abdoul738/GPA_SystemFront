import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-programme',
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css']
})
export class ProgrammeComponent implements OnInit {

  constructor(public _fb: FormBuilder,public addmore: FormGroup) { }

  ngOnInit(): void {
  }


  // programme(): FormArray {
  //   return this.form.get("programme") as FormArray
  // }

  // newQuantity(): FormGroup {
  //   return this.fb2.group({
  //     libelleactivite: '',
  //     date: '',
  //   })
  // }

  // addQuantity() {
  //   this.programme().push(this.newQuantity());
  //   this.qt++;
  //   console.log(this.qt);

  // }

  // removeQuantity(i: number) {
  //   this.programme().removeAt(i);
  //   this.qt--;
  //   console.log(this.qt);
  // } 

  // ngOnInit(): void {
  // }

  // displayStyle = "none";

  // openPopup() {
  //   this.displayStyle = "block";
  // }
  // closePopup() {
  //   this.displayStyle = "none";
  // }

  // getalluser() {
  //   this.Utilisateurservice.getalluser().subscribe(data => {
  //     this.allusers = data;
  //   })
  // }

  // getweek() {
  //   this.Utilisateurservice.getweek().subscribe(data => {
  //     this.week = data;
  //     console.log(this.week);
  //   })
  // }

  // activate() {
  //   this.personnalisation = false;
  //   this.choix = true;

  // }

  // desactivate() {
  //   this.personnalisation = true;
  //   this.choix = false;

  // }

  // select(){
  //   this.selection = true;
  //   this.saisi = false;
  // }

  // saisir(){
  //   this.selection = false;
  //   this.saisi = true;
  // }

  // get FormControl() {
  //   return this.form.controls;
  // }

  // submitProgramme() {

  //   // this.submitted = true;
  //   this.spinner = true;
  //   this.block = true;
  //   setTimeout(() => {

  //     const formdata: any = new FormData();

  //     console.log(this.form.controls['libelleactivite'].value);

  //     formdata.append("libelleactivite", this.form.controls['libelleactivite'].value);

  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Accept': 'application/json'
  //       })
  //     };

  //     this.http.post('http://127.0.0.1:8000/api/createactivite', formdata, httpOptions).subscribe(data => {
  //       this.programmes = data;
  //       console.log(this.programmes);
  //     })

  //     if (this.programmes = 0) {
  //       Swal.fire({
  //         title: 'Oups?',
  //         text: 'Erreur !!!',
  //         icon: 'error',
  //       })
  //       this.ngOnInit();
  //     }

  //     else {
  //       Swal.fire({
  //         title: 'success !!!',
  //         text: 'Programme enregistré !!!',
  //         icon: 'success',
  //       })
  //       this.router.navigateByUrl('/accueil');
  //     }


  //     this.spinner = false;
  //     this.block = false;

  //   }, 3000)

  // }


}
