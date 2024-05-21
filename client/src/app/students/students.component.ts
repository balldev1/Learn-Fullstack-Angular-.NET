import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Student} from "../types/student";
import {StudentsService} from "../services/students.service";
import {AsyncPipe, CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-students',
  standalone: true,
  // ทำหน้าที่ subscribe ไปยัง Observable หรือ Promise
  imports: [AsyncPipe,CommonModule,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  // students[]
  students$!:Observable<Student[]>
  // get service.student มาใช้
  studentService = inject(StudentsService);

  ngOnInit() {
    this.getStudent();
  }

  delete(id: number) {
    if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
      this.studentService.deleteStudent(id).subscribe({
        next: (response) => {
          console.log(response);
          this.getStudent(); // เรียกใช้เมธอดเพื่อโหลดข้อมูลใหม่หลังจากลบ
          alert("ลบรายการสำเร็จ");
        },
        error: (err) => {
          console.log(err);
          alert("เกิดข้อผิดพลาดในการลบรายการ");
        }
      });
    }
  }



  // ใช้ funciton ใน studentService
  // เก็บค่าที่ได้ไว้ที่ students$
  // เพืออัพทเดทข้อมูลล่าสุด student
  private getStudent():void{
    this.students$ = this.studentService.getStudents();
  }

}
