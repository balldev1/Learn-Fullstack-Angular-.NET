import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Student} from "../types/student";
import {StudentsService} from "../services/students.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-students',
  standalone: true,
  // ทำหน้าที่ subscribe ไปยัง Observable หรือ Promise
  imports: [AsyncPipe],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  // students[]
  students$!:Observable<Student[]>
  // get service.student มาใช้
  studentService = inject(StudentsService);

  ngOnInit() {
    // ใช้ funciton ใน studentService
    // เก็บค่าที่ได้ไว้ที่ students$
    this.students$ = this.studentService.getStudents();
  }

}
