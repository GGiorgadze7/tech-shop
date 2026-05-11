import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  userData = signal<any>(null);
  private http = inject(HttpClient);

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const token = localStorage.getItem('access_token');

    this.http
      .get('https://api.everrest.educata.dev/auth', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data) => {
          this.userData.set(data);
        },
      });
  }

  private router = inject(Router);

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
}
