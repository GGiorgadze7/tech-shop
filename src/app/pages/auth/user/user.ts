import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-user',
  imports: [RouterLink, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  userData = signal<any>(null);
  showEditForm = signal(false);

  updateData = {
    firstName: '',
    lastName: '',
    age: 0,
    address: '',
    phone: '',
    zipcode: '',
    avatar: '',
    gender: 'MALE',
  };

  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const token = localStorage.getItem('access_token');
    this.http
      .get('https://api.everrest.educata.dev/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (data: any) => {
          this.userData.set(data);
          this.updateData = {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            address: data.address || '',
            phone: data.phone || '',
            zipcode: data.zipcode || '',
            avatar: data.avatar || '',
            gender: data.gender,
          };
        },
      });
  }

  updateUser() {
    const token = localStorage.getItem('access_token');
    this.http
      .patch('https://api.everrest.educata.dev/auth/update', this.updateData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          this.notification.success('პროფილი განახლდა!');
          this.showEditForm.set(false);
          this.getUserData();
        },
        error: () => this.notification.error('განახლება ვერ მოხდა!'),
      });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
}