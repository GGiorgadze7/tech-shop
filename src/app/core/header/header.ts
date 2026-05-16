import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Signin } from '../../pages/auth/signin/signin';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  AppearMenu = false;

  menuToggle() {
    this.AppearMenu = !this.AppearMenu;
  }
}
