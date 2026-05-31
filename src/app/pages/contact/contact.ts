import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  private http = inject(HttpClient)

  isSubmitting = false;
  successMessage = false;

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.http.post('https://giorgadze.app.n8n.cloud/webhook/contact-form', this.contactData).subscribe();

    this.isSubmitting = true;

    setTimeout(() => {
      this.isSubmitting = false;
      this.successMessage = true;
      form.resetForm();

      setTimeout(() => {
        this.successMessage = false;
      }, 5000);
    }, 1500);
  }
}
