import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
  // template: `
  // <!-- <input type="text" (keyup.enter)="onKeyUp($event)"> -->
  // <input [value]="email" type="text" (keyup.enter)="email = $any($event.target).value; onEmail()">
  // `
})
export class CoursesComponent {
  courses = [{
    id: 1,
    name: "course1"
  }, {
    id: 2,
    name: "course2"
  }]

  email = "madhu@gmail.com"

  Add() {
    let lengths = this.courses.length + 1;
    this.courses.push({ id: lengths, name: `course${lengths}` })
  }

  OnRemove(course: any) {
    let index = this.courses.indexOf(course);
    this.courses.splice(index, 1);
  }
  OnUpdate(course: any) {
    course.name = `madhu`
  }
  onKeyUp($event: any) {
    console.log($event.target.value)
  }
  onEmail() {
    console.log(this.email)
  }
}
