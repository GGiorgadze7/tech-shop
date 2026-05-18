import { HttpClient } from '@angular/common/http';
import { Component, signal, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartData = signal<any>(null);
  cartProducts = signal<any[]>([]);
  showCheckoutForm = signal(false);

  private http = inject(HttpClient);
  private notification = inject(NotificationService);

  cheCkoutData = {
    CardName: '',
    CardNumber: '',
    cvv: '',
    expireDate: '',
  };

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    const token = localStorage.getItem('access_token');
    this.http
      .get('https://api.everrest.educata.dev/shop/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (data: any) => {
          this.cartData.set(data);
          console.log(data);
          this.getCartProducts(data.products);
        },
        error: () => console.log('მოხდა შეცდომა'),
      });
  }

  getCartProducts(cartItems: any[]) {
    const requests = cartItems.map((item) =>
      this.http.get(`https://api.everrest.educata.dev/shop/products/id/${item.productId}`),
    );

    requests.forEach((request, index) => {
      request.subscribe({
        next: (product: any) => {
          this.cartProducts.update((current) => {
            const list = current ?? [];
            return [
              ...list,
              {
                ...product,
                quantity: cartItems[index].quantity,
                pricePerQuantity: cartItems[index].pricePerQuantity,
                productId: cartItems[index].productId,
              },
            ];
          });
        },
        error: () => console.log('პროდუქტი ვერ ჩაიტვირთა'),
      });
    });
  }

  updateQuantity(productId: string, newQuantity: number) {
    const token = localStorage.getItem('access_token');

    if (newQuantity < 1) {
      this.deleteProduct(productId);
      return;
    }

    this.http
      .patch(
        'https://api.everrest.educata.dev/shop/cart/product',
        { id: productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .subscribe({
        next: () => {
          this.cartProducts.set([]);
          this.getCart();
        },
        error: () => this.notification.error('შეცდომა!'),
      });
  }

  deleteProduct(productId: string) {
    const token = localStorage.getItem('access_token');
    this.http
      .delete('https://api.everrest.educata.dev/shop/cart/product', {
        headers: { Authorization: `Bearer ${token}` },
        body: { id: productId },
      })
      .subscribe({
        next: () => {
          this.cartProducts.set([]);
          this.notification.success('პროდუქტი წაიშალა');
          this.getCart();
        },
        error: () => this.notification.error('პროდუქტი ვერ წაიშალა!'),
      });
  }

  clearCart() {
    const token = localStorage.getItem('access_token');
    this.http
      .delete('https://api.everrest.educata.dev/shop/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: () => {
          this.cartProducts.set([]);
          this.cartData.set(null);
          this.notification.success('კალათა გასუფთავდა');
        },
        error: () => this.notification.error('კალათა ვერ გასუფთავდა!'),
      });
  }

  checkout() {
    this.showCheckoutForm.set(true);
  }

  confirmOrder() {
    if (this.cheCkoutData.CardNumber.length < 16) {
      this.notification.error('ბარათის მონაცემები არასწორია');
      return;
    }

    const token = localStorage.getItem('access_token');

    this.http
      .post(
        'https://api.everrest.educata.dev/shop/cart/checkout',
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .subscribe({
        next: () => {
          this.cartProducts.set([]);
          this.cartData.set(null);
          this.showCheckoutForm.set(false);
          this.notification.success('შეკვეთა წარმატებით გაფორმდა!');
        },
        error: () => this.notification.error('მოხდა შეცდომა'),
      });
  }
}
