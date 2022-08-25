import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Utilisateur } from '../interfaces/utilisateur';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

const baseUrl = 'http://127.0.0.1:8000/api/createactivite';

@Injectable({
  providedIn: 'root'
})

export class FrontservicesService{

  public utilisateur: Utilisateur[] = [];
  public username: any;

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  constructor(private httpClient: HttpClient) { }


 create(utilisateur: Utilisateur){
    console.log(utilisateur);
    return this.httpClient.post('http://127.0.0.1:8000/api/registerUser',utilisateur);
  }

  login(utilisateur: Utilisateur){
    console.log(utilisateur.email);
    return this.httpClient.post('http://127.0.0.1:8000/api/verifyprofil',utilisateur);
  }

  getUsername() {
    this.username=localStorage.getItem('identifiant');
    return this.username;
  }

  getrole(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getroles');
  }
  
  getactivites(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getactivites');
  }

  getuser(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getuserbyid/'+id);
  }

  deleteuser(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/deluser/'+id);
  }

  getuserbyemail(email:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getuserbyemail/'+email);
  }

  getalluser(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getallusers');
  }

  getweek(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getweek');
  }


}
