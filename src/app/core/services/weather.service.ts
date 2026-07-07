import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

export type ClimateType = 'hot' | 'warm' | 'cold' | 'rainy';

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
  iconCode: string;
  climateType: ClimateType;
  adviceMessage: string;
  isMock?: boolean;
}

// Datos por defecto de ciudades populares para fallback o pruebas rápidas
const CITY_MOCKS: Record<string, Partial<WeatherData>> = {
  'Monterrey': { temp: 32, feelsLike: 34, condition: 'Clear', description: 'Cielo despejado y muy caluroso', humidity: 45, windSpeed: 14 },
  'Ciudad de México': { temp: 21, feelsLike: 21, condition: 'Clouds', description: 'Nubes dispersas y templado', humidity: 55, windSpeed: 10 },
  'Guadalajara': { temp: 27, feelsLike: 28, condition: 'Clear', description: 'Soleado y cálido', humidity: 40, windSpeed: 12 },
  'Cancún': { temp: 31, feelsLike: 36, condition: 'Clear', description: 'Calor tropical e hidratante', humidity: 75, windSpeed: 18 },
  'Toluca': { temp: 14, feelsLike: 13, condition: 'Rain', description: 'Lluvia ligera y clima fresco', humidity: 80, windSpeed: 16 },
  'Madrid': { temp: 16, feelsLike: 15, condition: 'Clouds', description: 'Cielo nublado y fresco', humidity: 60, windSpeed: 8 },
};

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private productService = inject(ProductService);

  // ApiKey configurable (el usuario o dev puede cambiarla si tiene una propia)
  private apiKey = signal<string>('c8309101d248b610c550dfbe8e0c6553'); // API key pública demo/fallback de prueba
  
  readonly currentWeather = signal<WeatherData | null>(this.generateMockWeather('Ciudad de México'));
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  constructor() {
    // La carga inicial se maneja desde el componente con geolocalización
  }

  setApiKey(key: string): void {
    this.apiKey.set(key);
  }

  getApiKey(): string {
    return this.apiKey();
  }

  async fetchWeatherByCity(cityName: string): Promise<WeatherData> {
    this.loading.set(true);
    this.error.set(null);

    const key = this.apiKey();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&lang=es&appid=${key}`;

    try {
      if (!key) {
        throw new Error('Sin API Key');
      }

      const res: any = await firstValueFrom(this.http.get(url));
      const weather = this.parseOpenWeatherResponse(res);
      this.currentWeather.set(weather);
      this.loading.set(false);
      return weather;
    } catch (err) {
      // Fallback a mock si falla la API key o no hay red
      const mock = this.generateMockWeather(cityName);
      this.currentWeather.set(mock);
      this.loading.set(false);
      return mock;
    }
  }

  async fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    this.loading.set(true);
    this.error.set(null);

    const key = this.apiKey();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${key}`;

    try {
      const res: any = await firstValueFrom(this.http.get(url));
      const weather = this.parseOpenWeatherResponse(res);
      this.currentWeather.set(weather);
      this.loading.set(false);
      return weather;
    } catch (err) {
      const mock = this.generateMockWeather('Tu Ubicación');
      this.currentWeather.set(mock);
      this.loading.set(false);
      return mock;
    }
  }

  private parseOpenWeatherResponse(res: any): WeatherData {
    const temp = Math.round(res.main.temp);
    const condition = res.weather[0]?.main || 'Clear';
    const description = res.weather[0]?.description || 'Clima actual';
    const iconCode = res.weather[0]?.icon || '01d';
    const climateType = this.calculateClimateType(temp, condition);
    const adviceMessage = this.generateAdviceMessage(temp, climateType, res.name);

    return {
      city: res.name || 'Ubicación actual',
      country: res.sys?.country || '',
      temp,
      feelsLike: Math.round(res.main.feels_like),
      humidity: res.main.humidity,
      windSpeed: Math.round(res.wind.speed * 3.6), // Convert to km/h
      condition,
      description: description.charAt(0).toUpperCase() + description.slice(1),
      iconCode,
      climateType,
      adviceMessage,
      isMock: false
    };
  }

  private generateMockWeather(cityName: string): WeatherData {
    const cleanCity = Object.keys(CITY_MOCKS).find(c => c.toLowerCase() === cityName.toLowerCase()) || cityName;
    const base = CITY_MOCKS[cleanCity] || {
      temp: 26,
      feelsLike: 27,
      condition: 'Clear',
      description: 'Día soleado ideal para refrescarse',
      humidity: 50,
      windSpeed: 12
    };

    const temp = base.temp ?? 25;
    const condition = base.condition ?? 'Clear';
    const climateType = this.calculateClimateType(temp, condition);

    return {
      city: cleanCity,
      country: 'MX',
      temp,
      feelsLike: base.feelsLike ?? temp,
      humidity: base.humidity ?? 50,
      windSpeed: base.windSpeed ?? 10,
      condition,
      description: base.description ?? 'Clima agradable',
      iconCode: climateType === 'hot' ? '01d' : climateType === 'rainy' ? '10d' : '02d',
      climateType,
      adviceMessage: this.generateAdviceMessage(temp, climateType, cleanCity),
      isMock: true
    };
  }

  private calculateClimateType(temp: number, condition: string): ClimateType {
    const condLower = condition.toLowerCase();
    if (condLower.includes('rain') || condLower.includes('drizzle') || condLower.includes('thunderstorm')) {
      return 'rainy';
    }
    if (temp >= 25) {
      return 'hot';
    }
    if (temp <= 17) {
      return 'cold';
    }
    return 'warm';
  }

  private generateAdviceMessage(temp: number, climate: ClimateType, city: string): string {
    switch (climate) {
      case 'hot':
        return `🔥 ¡Con ${temp}°C en ${city} hace bastante calor! Te recomendamos nuestras bebidas frías, frappés gourmet y limonadas recién exprimidas para refrescar tu día.`;
      case 'cold':
        return `❄️ ¡El clima en ${city} está fresco (${temp}°C)! Nada mejor que reconfortarte con nuestros cafés de la casa, chocolates calientes artesanales y té chai especiado.`;
      case 'rainy':
        return `🌧️ Un día lluvioso en ${city} se disfruta mejor con un café caliente recién hecho y un postre recién horneado. ¡Pide tu favorito!`;
      case 'warm':
      default:
        return `☕ Clima perfecto de ${temp}°C en ${city}. Disfruta de la mejor experiencia gastronómica con nuestros lattes cremosos y especialidades.`;
    }
  }

  getRecommendedProducts(climateType: ClimateType): Product[] {
    const all = this.productService.availableProducts();

    switch (climateType) {
      case 'hot':
        // Priorizar bebidas frías (cat2) o frappés / limonadas
        return all.filter(p => p.categoryId === 'cat2' || p.name.toLowerCase().includes('frappé') || p.name.toLowerCase().includes('limonada') || p.name.toLowerCase().includes('smoothie'));
      
      case 'cold':
        // Priorizar cafés calientes (cat1)
        return all.filter(p => p.categoryId === 'cat1');

      case 'rainy':
        // Bebidas calientes + Postres
        return all.filter(p => p.categoryId === 'cat1' || p.categoryId === 'cat3');

      case 'warm':
      default:
        // Mezcla variada (Top recomendados)
        return all.slice(0, 4);
    }
  }
}
