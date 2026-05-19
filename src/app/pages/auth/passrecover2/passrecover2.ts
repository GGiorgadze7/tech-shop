import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { SignupData } from '../../../shared/models/auth.model';

@Component({
  selector: 'app-passrecover2',
  imports: [FormsModule, RouterLink],
  templateUrl: './passrecover2.html',
  styleUrl: './passrecover2.css',
})
export class Passrecover2 {
  changePassData = {
    oldPassword: '',
    newPassword: '',
  };

  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  changePass() {
    const token = localStorage.getItem('access_token');

    this.http
      .patch('https://api.everrest.educata.dev/auth/change_password', this.changePassData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('პაროლი წარმატებით შეიცვალა!');
          this.router.navigateByUrl('/signin');
        },

        error: (error) => {
          console.error(error);
          if (this.changePassData.newPassword === this.changePassData.oldPassword) {
            this.notification.error('პაროლები ემთხვევა ერთმანეთს');
          }
        },
      });
  }
}
