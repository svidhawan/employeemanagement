import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.css']
})
export class EmployeesCreateComponent implements OnInit {
  errormsg: string;
  successmsg:string;
  constructor(private apiservice:ApiserviceService) { }

  ngOnInit(): void {
  }
   empForm = new FormGroup({
    'id' : new FormControl('',Validators.required),
    'username':new FormControl('',Validators.required),
    'email':new FormControl('',Validators.required),
    'createdAt':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required)
   });

   submit(){
      if(this.empForm.valid)
    {
      console.log(this.empForm.value);
    this.apiservice.createEmployee(this.empForm.value).subscribe((res)=>
    {
      console.log(res,"res=>");
      this.successmsg="Employee created successfully";
    })
    }
    else
      this.errormsg="all fields are required";

   }
}
