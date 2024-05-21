import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {

  form!:FormGroup;
  // fb คือ FormBuilder
  constructor(private fb:FormBuilder) {}

  // ใช้ FormBuilder.group เพือเก็บข้อมูล form
  ngOnInit() {
    this.form = this.fb.group({
      id:[],
      name:[],
      address:[],
      phoneNumber:[],
      email:[]
    });
  }
}
