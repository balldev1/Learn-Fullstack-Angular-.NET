import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../types/student";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  getStudents = ():Observable<Student[]> =>
    this.http.get<Student[]>("http://localhost:5187/api/students/")
}
