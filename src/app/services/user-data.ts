import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  userData = signal<any>(null);
}
