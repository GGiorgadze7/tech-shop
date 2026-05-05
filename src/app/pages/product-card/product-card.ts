import { Component, Input } from '@angular/core';
import { ProductInterface  } from '../../shared/models/products.model';
import { CurrencyPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, PercentPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
   @Input() productData!: ProductInterface;
}
