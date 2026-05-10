import { Component, Input } from '@angular/core';
import { ProductInterface  } from '../../shared/models/products.model';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, PercentPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
   @Input() product!: any;
}
