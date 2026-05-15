import { HttpClient } from '@angular/common/http';
import { Component, signal, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartData = signal<any>(null);
  cartProducts = signal<any[]>([]);

  private http = inject(HttpClient);

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
        this.getCartProducts(data.products); // ← ეს აკლდა
      },
      error: () => console.log('მოხდა შეცდომა'),
    });
}

  getCartProducts(cartItems: any[]) {
  const requests = cartItems.map((item) =>
    this.http.get(`https://api.everrest.educata.dev/shop/products/id/${item.productId}`)
  );

  requests.forEach((request, index) => {
    request.subscribe({
      next: (product: any) => {
        this.cartProducts.update((current) => {
          const list = current ?? [];
          return [...list, { ...product, quantity: cartItems[index].quantity, pricePerQuantity: cartItems[index].pricePerQuantity }];
        });
      },
      error: () => console.log('პროდუქტი ვერ ჩაიტვირთა'),
    });
  });
}

  
}
