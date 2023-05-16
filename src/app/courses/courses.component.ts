import { Component } from '@angular/core';

@Component({
  selector: 'courses',
  template: `
  <h2>{{ title }}</h2>
  <ul>
    <li *ngIf="courses.length > 0; then listCourses else NoCourses"></li>
  </ul>
  <ng-template #listCourses>
  <li *ngFor="let course of courses">
      {{ course }}
    </li>
</ng-template>

<ng-template #NoCourses>
    No courses
</ng-template>
  `
})
export class CoursesComponent {
  title = "List of courses";
  courses = ["course1", "course2", "course3"];
}
