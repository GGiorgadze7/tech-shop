import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-passrecover',
  imports: [FormsModule, RouterLink],
  templateUrl: './passrecover.html',
  styleUrl: './passrecover.css',
})
export class Passrecover {
  recoveryData = {
    email: '',
  };

  hasToken = false;
  notification = inject(NotificationService);

  ngOnInit() {
    const token = localStorage.getItem('token');

    this.hasToken = !!token;
  }

  successMessage = '';
  errorMessage = '';

  private http = inject(HttpClient);
  private navigate = inject(Router);

  recoveryPass() {
    this.http.post('https://api.everrest.educata.dev/auth/recovery', this.recoveryData).subscribe({
      next: (response) => {
        console.log(response);
        this.notification.success(
          'პაროლის აღდგენის მოთხოვნა წარმატებით გაიგზავნა. გთხოვთ, შეამოწმოთ თქვენი ელ-ფოსტა.',
        );
        this.navigate.navigateByUrl('/passrecover2');
      },
      error: (error) => {
        console.log(error);
        this.notification.error('მოხდა შეცდომა, სცადეთ თავიდან!');
      },
    });
  }
}
