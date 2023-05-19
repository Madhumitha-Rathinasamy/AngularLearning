import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      product: new FormControl(''),
      price: new FormControl(''),
      tax: new FormControl('')

      // Add more form controls as needed
    });
  }
  onSubmit(){
    console.log(this.myForm)
  }
  onTax(price:any){
    let amount = price * 2 / 100;
    return amount;
  }
}

