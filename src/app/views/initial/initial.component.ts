import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.sass']
})
export class InitialComponent {

  constructor(private router: Router){}

  navegar(){
    this.router.navigate(['/login']);
  }

}
