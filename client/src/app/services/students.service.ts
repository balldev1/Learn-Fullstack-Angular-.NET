import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../types/student";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  apiUrl = "http://localhost:5187/api/students"

  constructor(private http:HttpClient) { }

  getStudents = ():Observable<Student[]> => this.http.get<Student[]>(this.apiUrl);
  // post => (get.data)
  addStudents=(data: Student) => this.http.post(this.apiUrl, data);
  // stundent(:id)
  getStudentMethod=(id:number):Observable<Student>=>this.http.get<Student>(this.apiUrl+"/"+id);

  deleteStudent=(id:number)=>this.http.delete<Student>(this.apiUrl+"/"+id);

  editStudent=(id:number,data:Student)=>this.http.put<Student>(this.apiUrl+"/"+id, data);

}
