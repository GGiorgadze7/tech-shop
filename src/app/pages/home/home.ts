import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCard } from '../product-card/product-card';
import { ProductInterface } from '../../shared/models/products.model';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

interface IProductResponse {
  products: ProductInterface[];
  total: number;
}

@Component({
  selector: 'app-home',
  imports: [ProductCard, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  AppearSlide = false;

  appearSlider() {
    this.AppearSlide = !this.AppearSlide;
  }

  productsList = signal<any>(null);
  categories = signal<any[]>([]);
  selectedCategory = signal<string>('');
  sortBy = signal<string>('');
  sortDirection = signal<string>('asc');

  private http = inject(HttpClient);

  pageSize = signal(13);
  pageIndex = signal(1);

  ngOnInit() {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.http.get<any[]>('https://api.everrest.educata.dev/shop/products/categories').subscribe({
      next: (data) => this.categories.set(data),
    });
  }

  getProducts() {
    const params: any = {
      page_size: this.pageSize(),
      page_index: this.pageIndex(),
    };

    if (this.liveSearchKeyword()) {
      params['keywords'] = this.liveSearchKeyword();
    }

    if (this.selectedCategory()) {
      params['category_id'] = this.selectedCategory();
    }

    if (this.sortBy()) {
      params['sort_by'] = this.sortBy();
      params['sort_direction'] = this.sortDirection();
    }

    this.http.get('https://api.everrest.educata.dev/shop/products/search', { params }).subscribe({
      next: (data) => this.productsList.set(data),
    });
  }

  selectCategory(id: string) {
    this.selectedCategory.set(this.selectedCategory() === id ? '' : id);
    this.pageIndex.set(1);
    this.getProducts();
  }

  onSortChange(value: string) {
    if (!value) {
      this.sortBy.set('');
      this.sortDirection.set('asc');
    } else {
      const [by, direction] = value.split('-');
      this.sortBy.set(by);
      this.sortDirection.set(direction);
    }
    this.pageIndex.set(1);
    this.getProducts();
  }

  nextPage() {
    if (this.productsList() && this.pageIndex() * this.pageSize() < this.productsList().total) {
      this.pageIndex.update((page) => page + 1);
      this.getProducts();
      window.scrollTo({ top: 0 });
    }
  }

  prevPage() {
    if (this.pageIndex() > 1) {
      this.pageIndex.update((page) => page - 1);
      this.getProducts();
      window.scrollTo({ top: 0 });
    }
  }

  liveSearchKeyword = signal('');

  liveSearch(value: string) {
    this.liveSearchKeyword.set(value);
    this.pageIndex.set(1);
    this.getProducts();
  }
}
