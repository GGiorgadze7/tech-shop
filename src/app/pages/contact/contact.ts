import { Component } from '@angular/core';
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

  isSubmitting = false;
  successMessage = false;

  onSubmit(form: NgForm) {
    if (form.invalid) return;

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
