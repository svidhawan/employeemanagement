import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
;
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  updateEmployee(empObj: Employee) {
    let id= empObj.id;
    console.log("inside update operation");
    return this.http.put('http://localhost:3000/emp/'+id,empObj);
  }
  deleteEmployee(id: any) {
    const eid= String(id);
    console.log("inside delete operation id is",eid);
    return this.http.delete('http://localhost:3000/emp/'+eid);

  }

  constructor(private http:HttpClient) { }



  getAllEmployees():Observable<any>
  {
    console.log("Inside service");
       return this.http.get('http://localhost:3000/emp');
  }

  createEmployee(data:any):Observable<any>
  {
    console.log('Inside create emp');
    return this.http.post('http://localhost:3000/emp',data);
  }
}
