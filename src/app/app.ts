import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./core/header/header";
import { Footer } from "./core/footer/footer";
import { Notification } from "./shared/notification/notification";
import { N8nChat } from "./shared/n8n-chat/n8n-chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Notification, N8nChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tech-shop');
}
