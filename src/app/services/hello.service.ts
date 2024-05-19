import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelloService {

  private url:string = 'http://localhost:8081/auth';

  constructor(private http:HttpClient) { }

  get(){
    return this.http.get(`${this.url}/get`);
  }
}
