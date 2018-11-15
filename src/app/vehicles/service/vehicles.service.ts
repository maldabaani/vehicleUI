import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  serviceUrl: string="/api/owner";

  constructor(private http: HttpClient) { 

  }
  public getAllVehciles() : Observable<any[]>{
    console.log("Hey..");
    console.log(this.serviceUrl);
    return this.http.get<any[]>(this.serviceUrl); 
  }
}
