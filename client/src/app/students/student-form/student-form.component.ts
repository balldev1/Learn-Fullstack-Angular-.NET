import {Component, inject, OnInit,OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StudentsService} from "../../services/students.service";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    RouterLink,

  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit , OnDestroy{
  id!: number | null;
  form!:FormGroup;
  studentformSubscription!:Subscription;
  paramsSubscription!:Subscription;
  studentService = inject(StudentsService);
  isEdit=false;
  // fb คือ FormBuilder
  constructor(
    private fb:FormBuilder,
    private activatedRouter:ActivatedRoute,
    private router:Router,
    ) {}

  // ใช้ FormBuilder.group เพือเก็บข้อมูล form
  // Validators.required ตรวจสอบว่าฟิลด์นี้ต้องมีค่า (ไม่สามารถเป็นค่าว่างได้)
  // Validators.email ตรวจสอบว่าค่าที่ใส่ในฟิลด์นี้ต้องเป็นอีเมลที่ถูกต้องตามรูปแบบอีเมลมาตรฐาน
  ngOnInit() {

    //Edit  / Add stundent ทำงานสองฟังชั่น
    // get.id.params เพือเอา id มาใช้ในการเอาข้อมูลของ id นั้นมาใช้
    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {
        next:(response)=>{
          console.log("this id params",response["id"]);
          let id = response["id"];
          this.id = id;
          // ถ้าไม่ใช่ id ไมต้อง getstudents
          // add student
          if(!id) return;
          // else
          // edit student
          this.studentService.getStudentMethod(response['id']).subscribe({
            next:response=>{
              this.form.patchValue(response);
              this.isEdit = true;
              console.log("this response getStudent:id",response);
            },error:err=>{
              console.log(err);
            }
          })
        },
        error:err=>{
          console.log(err);
        }
      }
    )

    // form
    this.form = this.fb.group({
      name:["",Validators.required],
      address:[],
      phoneNumber:[],
      email:["",Validators.email]
    });
  }

  // ใช้เพือยกเลิก subscibe
  ngOnDestroy(): void {
    if(this.studentformSubscription){
      this.studentformSubscription.unsubscribe();
    }

    if(this.paramsSubscription){
      this.paramsSubscription.unsubscribe();
    }
  }

  //Subscription
  onSubmit() {
    if(!this.isEdit){
      this.studentService.addStudents(this.form.value).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigateByUrl("/students");
        },
        error: err => {
          console.log(err);
        }
      });
    }else{
      this.studentService.editStudent(this.id!, this.form.value).subscribe({
       next: (response) => {
         console.log(response);
         this.router.navigateByUrl("/students");
       },
       error: err => {
         console.log(err);
       }
     });
    }
    }

}
