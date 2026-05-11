import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupData = {
    firstName: '',
    lastName: '',
    age: 18,
    email: '',
    password: '',
    address: '',
    phone: '+995577189408',
    zipcode: '0101',
    avatar: 'https://linkedin.com',
    gender: 'MALE',
  };

  verifyData = {
    email: '',
  };

  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  onSubmit() {
    if (this.signupData.password !== this.confirmPassword) {
      this.errorMessage = 'პაროლები არ ემთხვევა';
      return;
    }

    this.http.post('https://api.everrest.educata.dev/auth/sign_up', this.signupData).subscribe({
      next: (response) => {
        console.log(response);
        this.notification.success('რეგისტრაცია წარმატებით დასრულდა');
        this.router.navigateByUrl('/signin');
      },

      error: (error) => {
        console.error(error);
        this.notification.error('რეგისტრაცია ვერ განხორციელდა');
      },
    });
  }
}
