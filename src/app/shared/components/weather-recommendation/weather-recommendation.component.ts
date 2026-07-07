import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData, ClimateType } from '../../../core/services/weather.service';
import { Product } from '../../../core/models/product.model';
import { OrderService } from '../../../core/services/order.service';
import { CartService } from '../../../core/services/cart.service';

interface NearbyCity {
  name: string;
  lat: number;
  lon: number;
  distance: number; // km
}

// Base de datos de ciudades mexicanas con coordenadas
const MEXICAN_CITIES: { name: string; lat: number; lon: number }[] = [
  { name: 'Ciudad de México', lat: 19.4326, lon: -99.1332 },
  { name: 'Monterrey', lat: 25.6866, lon: -100.3161 },
  { name: 'Guadalajara', lat: 20.6597, lon: -103.3496 },
  { name: 'Puebla', lat: 19.0414, lon: -98.2063 },
  { name: 'Toluca', lat: 19.2826, lon: -99.6557 },
  { name: 'Cancún', lat: 21.1619, lon: -86.8515 },
  { name: 'Mérida', lat: 20.9674, lon: -89.5926 },
  { name: 'Querétaro', lat: 20.5888, lon: -100.3899 },
  { name: 'León', lat: 21.1221, lon: -101.6840 },
  { name: 'San Luis Potosí', lat: 22.1565, lon: -100.9855 },
  { name: 'Aguascalientes', lat: 21.8853, lon: -102.2916 },
  { name: 'Hermosillo', lat: 29.0729, lon: -110.9559 },
  { name: 'Chihuahua', lat: 28.6353, lon: -106.0889 },
  { name: 'Tijuana', lat: 32.5149, lon: -117.0382 },
  { name: 'Morelia', lat: 19.7060, lon: -101.1950 },
  { name: 'Villahermosa', lat: 17.9869, lon: -92.9303 },
  { name: 'Tuxtla Gutiérrez', lat: 16.7528, lon: -93.1152 },
  { name: 'Oaxaca', lat: 17.0732, lon: -96.7266 },
  { name: 'Veracruz', lat: 19.1738, lon: -96.1342 },
  { name: 'Saltillo', lat: 25.4232, lon: -100.9924 },
  { name: 'Cuernavaca', lat: 18.9186, lon: -99.2341 },
  { name: 'Pachuca', lat: 20.1011, lon: -98.7591 },
  { name: 'Zacatecas', lat: 22.7709, lon: -102.5832 },
  { name: 'Durango', lat: 24.0277, lon: -104.6532 },
  { name: 'Tampico', lat: 22.2331, lon: -97.8613 },
  { name: 'Mazatlán', lat: 23.2494, lon: -106.4111 },
  { name: 'Acapulco', lat: 16.8531, lon: -99.8237 },
  { name: 'Culiacán', lat: 24.8049, lon: -107.3940 },
  { name: 'Tepic', lat: 21.5041, lon: -104.8946 },
  { name: 'Colima', lat: 19.2433, lon: -103.7247 },
  { name: 'Campeche', lat: 19.8301, lon: -90.5349 },
  { name: 'Tlaxcala', lat: 19.3181, lon: -98.2375 },
  { name: 'Celaya', lat: 20.5238, lon: -100.8155 },
  { name: 'Irapuato', lat: 20.6766, lon: -101.3560 },
  { name: 'Playa del Carmen', lat: 20.6296, lon: -87.0739 },
];

@Component({
  selector: 'app-weather-recommendation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-recommendation.component.html',
  styleUrl: './weather-recommendation.component.css'
})
export class WeatherRecommendationComponent implements OnInit {
  weatherService = inject(WeatherService);
  orderService = inject(OrderService);
  cartService = inject(CartService);

  nearbyCities = signal<NearbyCity[]>([]);
  customApiKey = '';
  showKeyModal = false;
  addedMessage = signal<string | null>(null);
  locationLoading = signal<boolean>(false);
  userCoords = signal<{ lat: number; lon: number } | null>(null);

  ngOnInit(): void {
    this.customApiKey = this.weatherService.getApiKey();
    // Auto-detectar ubicación del usuario al iniciar
    this.useMyLocation();
  }

  onCitySelect(city: NearbyCity): void {
    this.weatherService.fetchWeatherByCoords(city.lat, city.lon);
  }

  useMyLocation(): void {
    if (navigator.geolocation) {
      this.locationLoading.set(true);
      this.weatherService.loading.set(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          this.userCoords.set({ lat, lon });
          this.weatherService.fetchWeatherByCoords(lat, lon);
          this.calculateNearbyCities(lat, lon);
          this.locationLoading.set(false);
        },
        (err) => {
          // Fallback: usar Ciudad de México si no se puede obtener la ubicación
          const fallbackLat = 19.4326;
          const fallbackLon = -99.1332;
          this.userCoords.set({ lat: fallbackLat, lon: fallbackLon });
          this.weatherService.fetchWeatherByCoords(fallbackLat, fallbackLon);
          this.calculateNearbyCities(fallbackLat, fallbackLon);
          this.locationLoading.set(false);
        }
      );
    } else {
      // Sin soporte de geolocalización
      const fallbackLat = 19.4326;
      const fallbackLon = -99.1332;
      this.userCoords.set({ lat: fallbackLat, lon: fallbackLon });
      this.weatherService.fetchWeatherByCoords(fallbackLat, fallbackLon);
      this.calculateNearbyCities(fallbackLat, fallbackLon);
    }
  }

  /** Calcula las ciudades más cercanas usando la fórmula de Haversine */
  private calculateNearbyCities(lat: number, lon: number): void {
    const citiesWithDistance = MEXICAN_CITIES.map(city => ({
      ...city,
      distance: this.haversineDistance(lat, lon, city.lat, city.lon)
    }));

    // Ordenar por distancia y tomar las 6 más cercanas (excluyendo la ciudad actual si está muy cerca)
    citiesWithDistance.sort((a, b) => a.distance - b.distance);

    // Tomar las primeras 6 ciudades cercanas (saltando la que esté a menos de 5km ya que sería la misma)
    const nearby = citiesWithDistance
      .filter(c => c.distance > 5)
      .slice(0, 6);

    this.nearbyCities.set(nearby);
  }

  /** Fórmula de Haversine para calcular la distancia entre dos coordenadas en km */
  private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  get recommendedProducts(): Product[] {
    const weather = this.weatherService.currentWeather();
    if (!weather) return [];
    return this.weatherService.getRecommendedProducts(weather.climateType);
  }

  getClimateBadgeClass(climate: ClimateType): string {
    switch (climate) {
      case 'hot': return 'badge-hot';
      case 'cold': return 'badge-cold';
      case 'rainy': return 'badge-rainy';
      case 'warm': default: return 'badge-warm';
    }
  }

  getClimateIcon(climate: ClimateType): string {
    switch (climate) {
      case 'hot': return 'wb_sunny';
      case 'cold': return 'ac_unit';
      case 'rainy': return 'water_drop';
      case 'warm': default: return 'thermostat';
    }
  }

  getDrinkRecommendationTag(product: Product, climate: ClimateType): string {
    if (climate === 'hot') return '🔥 Ideal para refrescarte';
    if (climate === 'cold') return '❄️ Para entrar en calor';
    if (climate === 'rainy') return '🌧️ Perfecto para la lluvia';
    return '☕ Recomendación del Chef';
  }

  saveApiKey(): void {
    this.weatherService.setApiKey(this.customApiKey.trim());
    this.showKeyModal = false;
    // Recargar clima con la nueva API key
    const coords = this.userCoords();
    if (coords) {
      this.weatherService.fetchWeatherByCoords(coords.lat, coords.lon);
    }
  }

  quickOrder(product: Product): void {
    // Añadir al carrito del cliente
    this.cartService.addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      notes: 'Sugerencia por clima',
      options: [],
      image: product.imageUrl || product.image
    });

    this.addedMessage.set(`¡${product.name} añadido a tu carrito de compras!`);
    setTimeout(() => this.addedMessage.set(null), 3500);
  }
}
