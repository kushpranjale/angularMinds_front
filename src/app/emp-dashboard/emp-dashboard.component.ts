import { EmpServiceService } from './../Sevices/emp-service.service';
import { Component, OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css'],
})
export class EmpDashboardComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'name', 'email', 'age'];
  dataSource;
  constructor(
    private empService: EmpServiceService,
    private formBuilder: FormBuilder
  ) {}
  employeeGroup: FormGroup;
  ngOnInit(): void {
    this.employeeGroup = this.formBuilder.group({
      emp_id: ['', [Validators.required]],
      emp_name: ['', [Validators.required]],
      emp_email: ['', [Validators.required, Validators.email]],
      emp_age: ['', [Validators.required]],
    });
    this.empService.updateDataListener().subscribe(() => {
      this.getAllEmployee();
    });
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.empService.getAllEmployee().subscribe((result) => {
      console.log(result);
      this.dataSource = result;
    });
  }
  onSubmit(formDirective: FormGroupDirective) {
    this.empService.addEmployee(this.employeeGroup);
  }
}
