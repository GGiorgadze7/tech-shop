import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../product-card/product-card';
import { ProductInterface } from '../../shared/models/products.model';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs';
import { signal } from '@angular/core';
interface IProductResponse {
  products: ProductInterface[];
  total: number;
}

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isLoading = signal(true);

  private http = inject(HttpClient);

  productsList = toSignal<ProductInterface[]>(
    this.http.get<IProductResponse>('https://api.everrest.educata.dev/shop/products/all').pipe(
      map((res) => res.products),
      finalize(() => {
        this.isLoading.set(false);
      }),
    ),
    
  );
}
