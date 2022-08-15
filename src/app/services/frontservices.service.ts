import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Utilisateur } from '../interfaces/utilisateur';
import { Role } from '../interfaces/role';
import { Patrimoine } from '../interfaces/patrimoine';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { Activite } from '../models/activite.model';
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

  createAct(data: any): Observable<any> {
    return this.httpClient.post(baseUrl, data);
  }

 create(utilisateur: Utilisateur){
    console.log(utilisateur.profession);
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

  addPatrimoine(patrimoine: Patrimoine){
    return this.httpClient.post('http://127.0.0.1:8000/api/saveP',patrimoine);
  }

  getrole(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getroles');
  }

  getpatrimoines(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getPatrimoines');
  }

  getpatrimoinesvalidated(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getpatrimoinesvalidated');
  }

  getapatrimoine(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getapatrimoine/'+id);
  }

  validerpatrimoine(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/validerpatrimoine/'+id);
  }

  retirerpatrimoine(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/retirerpatrimoine/'+id);
  }

  getpatrimoinesnumber()
  {
    return this.httpClient.get('http://127.0.0.1:8000/api/getpatrimoinesnumber');
  }


  getapatrimoinebyuserid(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getapatrimoinebyuserid/'+id);
  }

  getpatrimoinebnumber(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getpatrimoinebnumber/'+id);
  }

  getcommentsnumber(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getcommentsnumber/'+id);
  }

  getprimarycomment(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getprimarycomment/'+id);
  }

  getuser(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getuser/'+id);
  }

  getuserbyemail(email:any)
  {
    return this.httpClient.get('http://127.0.0.1:8000/api/getuserbyemail/'+email);
  }

  getalluser(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getallusers');
  }

  getweek(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getweek');
  }

  getlat(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getlat/'+id);
  }

  getlong(id:any)
  {
    console.log(id)
    return this.httpClient.get('http://127.0.0.1:8000/api/getlong/'+id);
  }


}
