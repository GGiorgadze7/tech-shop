import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Signin } from "../../pages/auth/signin/signin";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Signin],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  AppearMenu = false;

  menuToggle() {
    this.AppearMenu= !this.AppearMenu;
  }
}
