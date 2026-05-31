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
    phone: '',
    zipcode: '',
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

  private n8nWebhookUrl = 'https://giorgadze.app.n8n.cloud/webhook/register-email';

  private sendWelcomeEmail(firstName: string, email: string) {
    this.http
      .post(this.n8nWebhookUrl, {
        name: firstName,
        email: email,
      })
      .subscribe({
        next: () => console.log('მეილი გაიგზავნა'),
        error: (err) => console.error('მეილის გაგზავნა ვერ მოხერხდა', err),
      });
  }

  onSubmit() {
    if (this.signupData.age < 18) {
      this.errorMessage = 'რეგისტრაციისთვის თქვენ უნდა იყოთ 18+';
      return;
    }

    if (this.signupData.password !== this.confirmPassword) {
      this.errorMessage = 'პაროლები არ ემთხვევა';
      return;
    }

    this.http.post('https://api.everrest.educata.dev/auth/sign_up', this.signupData).subscribe({
      next: (response) => {
        console.log(response);

        this.sendWelcomeEmail(this.signupData.firstName, this.signupData.email);

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
