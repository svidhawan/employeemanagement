import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit
{
    empall:any=[];
    empDetail !: FormGroup;
    empObj : Employee = new Employee();
  constructor(private apiservice: ApiserviceService,private formBuilder : FormBuilder) { }

  ngOnInit(): void
  {
    this.empall= this.apiservice.getAllEmployees().subscribe((res)=>
    {
      console.log("inside list component");
      console.log(res.data,"res=>");
       this.empall=res.data;
    })
    this.empDetail = this.formBuilder.group({
      id : [''],
      name : [''],
      salary: [''],
      email: ['']
  })
}

deleteEmployee(id:any) {

  this.apiservice.deleteEmployee(id).subscribe(res=>{
    console.log(res);
    alert('Employee deleted successfully');
    this.apiservice.getAllEmployees();
  },err => {
    console.log(err);
  });

}

updateEmployee() {

  this.empObj.id = this.empDetail.value.id;
  this.empObj.name = this.empDetail.value.name;
  this.empObj.salary = this.empDetail.value.salary;
  this.empObj.email = this.empDetail.value.email;

  this.apiservice.updateEmployee(this.empObj).subscribe(res=>{
    console.log(res);
    this.apiservice.getAllEmployees();
  },err=>{
    console.log(err);
  })

}
}


  // this.empDetail = this.formBuilder.group({
  //   id : [''],
  //   name : [''],
  //   salary: [''],
  //   email: ['']
  // });


  // deleteEmployee(emp)
  // {
  //   this.apiservice.deleteEmployee(emp).subscribe(res=>{
  //     console.log(res);
  //     alert('Employee deleted successfully');
  //     this.apiservice.getAllEmployees();
  //   },err => {
  //     console.log(err);
  //   });
  // }





