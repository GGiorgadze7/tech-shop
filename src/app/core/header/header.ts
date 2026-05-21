import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  AppearMenu = false;
  theme = inject(ThemeService);

  menuToggle() {
    this.AppearMenu = !this.AppearMenu;
  }
}
