import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';


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

  onSubmit() {
    this.http.post('https://api.everrest.educata.dev/auth/sign_in', this.signInData).subscribe({
      next: (data: any) => {
        (localStorage.setItem('access_token', data.access_token),
          localStorage.setItem('refresh_token', data.refresh_token));
        this.router.navigateByUrl('/');
      },
      error: () => {
        alert('მოხდა შეცდომა');
      },
    });
  }

}
