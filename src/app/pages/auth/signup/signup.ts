import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  // signup ngmodel
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  age: number = 18;
  phoneNumber = '';
  zipCode = '';
  address: string = '';
  password = '';
  confirmPassword = '';
  gender: string = 'male';
  errorMesage = '';
  succesMesage = '';

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.password !== this.confirmPassword) {
      this.errorMesage = 'პაროლები არ ემთხვევა';
      return;
    }
  }
}
