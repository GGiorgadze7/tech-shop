import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

interface ProductPrice {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

interface ProductCategory {
  id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: string[];
  price: ProductPrice;
  category: ProductCategory;
}

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productData = signal<Product | null>(null);
  selectedImage = signal<string | null>(null);

  galleryImages = computed(() => {
    const product = this.productData();

    if (!product) {
      return [];
    }

    return product.images.filter((image) => image !== product.thumbnail);
  });

  currentImage = computed(() => {
    const product = this.productData();
    return this.selectedImage() || product?.thumbnail || '';
  });

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<Product>(`https://api.everrest.educata.dev/shop/products/id/${id}`).subscribe({
      next: (data) => {
        this.productData.set(data);
        this.selectedImage.set(data.thumbnail);
      },
    });
  }

  selectImage(image: string) {
    this.selectedImage.set(image);
  }

  hasDiscount(product: Product) {
    return (
      product.price.discountPercentage > 0 && product.price.beforeDiscount > product.price.current
    );
  }

  formatDate(value: string) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(new Date(value));
  }

  @Input() product!: any;

  private router = inject(Router);
  private notification = inject(NotificationService);

   addToCart() {
    const token = localStorage.getItem('access_token');
    const product = this.productData();

    if (!token) {
      this.notification.error('პროდუქტის დასამატებლად გაიარეთ ავტორიზაცია!');
      return;
    }

    if (!product) return;

    this.http
      .get<any>('https://api.everrest.educata.dev/shop/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .subscribe({
        next: (cart) => {
          const existing = cart.products.find((p: any) => p.productId === product._id);
          const newQuantity = existing ? existing.quantity + 1 : 1;

          this.http
            .patch(
              'https://api.everrest.educata.dev/shop/cart/product',
              { id: product._id, quantity: newQuantity },
              { headers: { Authorization: `Bearer ${token}` } },
            )
            .subscribe({
              next: () => this.notification.success('პროდუქტი ჩავარდა კალათში'),
              error: () => this.notification.error('პროდუქტი ვერ დაემატა'),
            });
        },
        error: () => this.createCart(token),
      });
  }

  createCart(token: string) {
    const product = this.productData();
    if (!product) return;

    this.http
      .post(
        'https://api.everrest.educata.dev/shop/cart/product',
        { id: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .subscribe({
        next: () => this.notification.success('პროდუქტი დაემატა'),
        error: () => this.notification.error('პროდუქტი ვერ დაემატა'),
      });
  }
}
