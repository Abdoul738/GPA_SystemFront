import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public username:any;

  constructor(public router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem('identifiant');
  }

  public test(){
    this.router.navigateByUrl('/login');
  }

}
