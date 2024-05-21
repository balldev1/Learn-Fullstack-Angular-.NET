import { Routes } from '@angular/router';
import {StudentsComponent} from "./students/students.component";
import {StudentFormComponent} from "./students/student-form/student-form.component";

export const routes: Routes = [
  {
    path: "students",
    component:StudentsComponent
  },
  // Add stundent
  {
    path:"student/form",
    component:StudentFormComponent
  },
  // stundent:id
  {
    path:"students/:id",
    component:StudentFormComponent
  }
];
