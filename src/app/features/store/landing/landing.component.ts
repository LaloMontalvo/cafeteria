import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { WeatherRecommendationComponent } from '../../../shared/components/weather-recommendation/weather-recommendation.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, WeatherRecommendationComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(public productService: ProductService) {}

  get featuredProducts() {
    return this.productService.availableProducts().slice(0, 6);
  }

  get categories() {
    return this.productService.allCategories();
  }
}
