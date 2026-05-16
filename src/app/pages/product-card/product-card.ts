import { Component, inject, Input, signal } from '@angular/core';
import { ProductInterface } from '../../shared/models/products.model';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: any;

  private http = inject(HttpClient);
  private router = inject(Router);
  private notification = inject(NotificationService);

  addToCart() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.notification.error('პროდუქტის დასამატებლად გაიარეთ ავტორიზაცია!');
      return;
    }

    this.http
      .get<any>('https://api.everrest.educata.dev/shop/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (cart) => {
          const existing = cart.products.find((p: any) => p.productId === this.product._id);
          const newQuantity = existing ? existing.quantity + 1 : 1;

          this.http
            .patch(
              'https://api.everrest.educata.dev/shop/cart/product',
              { id: this.product._id, quantity: newQuantity },
              { headers: { Authorization: `Bearer ${token}` } },
            )
            .subscribe({
              next: () => this.notification.success('პროდუქტი ჩავარდა კალათში'),
              error: () => this.notification.error('პროდუქტი ვერ დაემატა'),
            });
        },
        error: () => {
          this.createCart(token);
        },
      });
  }

  createCart(token: string) {
    this.http
      .post(
        'https://api.everrest.educata.dev/shop/cart/product',
        {
          id: this.product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .subscribe({
        next: () => this.notification.success('პროდუქტი დაემატა'),
        error: () => {
          this.notification.error('პროდუქტი ვერ დაემატა');
        },
      });
  }

 


}
