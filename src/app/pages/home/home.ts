import { Component, inject, OnInit } from '@angular/core';
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
export class Home implements OnInit {
  productsList = signal<any>(null);

  private http = inject(HttpClient);

  pageSize = signal(13);
  pageIndex = signal(1);

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http
      .get('https://api.everrest.educata.dev/shop/products/all', {
        params: {
          page_size: this.pageSize(),
          page_index: this.pageIndex(),
        },
      })
      .subscribe({
        next: (data) => {
          this.productsList.set(data);
        },
      });
  }

  nextPage() {
    if (this.productsList() && this.pageIndex() * this.pageSize() < this.productsList().total) {
      this.pageIndex.update((page) => page + 1);
      this.getProducts();
      window.scrollTo({ top: 0});
    }
  }

  prevPage() {
    if (this.pageIndex() > 1) {
      this.pageIndex.update((page) => page - 1);
      this.getProducts();
      window.scrollTo({ top: 0});
    }
  }
}
