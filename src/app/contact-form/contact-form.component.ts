import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
  // styleUrls: ['./contact-form.component.css']
  // template: `
  // {{ email }}
})
export class ContactFormComponent {

  email = "madhumitha";

  log(firstName:any) {
   console.log(firstName)
  }

}

