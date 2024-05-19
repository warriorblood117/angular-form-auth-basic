import { Component, OnInit } from '@angular/core';
import { HelloService } from 'src/app/services/hello.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message:string = 'no te has logueado';

  constructor(private helloService:HelloService){}

  ngOnInit(): void {
    this.helloService.get().subscribe({
      next: response => this.message = JSON.stringify(response)
    });
  }


}
