import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmpServiceService {
  url = 'http://localhost:5000';
  updatedData = new Subject();
  constructor(private http: HttpClient) {}
  updateDataListener() {
    return this.updatedData.asObservable();
  }
  getAllEmployee() {
    return this.http.get(this.url + '/get_allEmployee');
  }
  addEmployee(data: FormGroup) {
    this.http.post(this.url + '/add_emp', data.value).subscribe((result) => {
      this.updatedData.next();
    });
  }
}
