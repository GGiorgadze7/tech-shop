import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-signin',
  imports: [FormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

 signInData = {
    email: '',
    password: '',
  };

  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  onSubmit() {
    this.http.post('https://api.everrest.educata.dev/auth/sign_in', this.signInData).subscribe({
      next: (data: any) => {
        (localStorage.setItem('access_token', data.access_token),
          localStorage.setItem('refresh_token', data.refresh_token));
          this.notification.success('ავტორიზაცია წარმატებით დასრულდა');
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.notification.error('ავტორიზაცია ვერ განხორციელდა');
      },
    });
  }

}
