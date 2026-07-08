import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { WeatherRecommendationComponent } from '../../../shared/components/weather-recommendation/weather-recommendation.component';

interface ComboItem {
  name: string;
  icon: string;
}

interface Combo {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  tagIcon: string;
  items: ComboItem[];
}

interface CarouselItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, WeatherRecommendationComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  @ViewChild('slider', { static: false }) sliderRef!: ElementRef;

  addedCombo = signal<string | null>(null);

  carouselItems: CarouselItem[] = [
    {
      title: 'Aroma Intenso',
      description: 'Granos de altura 100% arábiga seleccionados y tostados artesanalmente para lograr el espresso perfecto.',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1200&q=80',
      link: '/store/menu'
    },
    {
      title: 'Dulce Deleite',
      description: 'Disfruta de nuestro bizcocho ultra húmedo de chocolate belga y postres recién horneados hoy.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
      link: '/store/menu'
    },
    {
      title: 'Moka Gourmet',
      description: 'Una deliciosa y refrescante mezcla helada de espresso y chocolate belga con crema batida.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
      link: '/store/menu'
    },
    {
      title: 'Panini Caprese',
      description: 'Pan baguette crujiente con mozzarella fresca, jitomates y pesto artesanal de albahaca.',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
      link: '/store/menu'
    },
    {
      title: 'Frutos del Bosque',
      description: 'Cremoso cheesecake estilo Nueva York sobre galleta crujiente con delicioso coulis de frutos rojos.',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80',
      link: '/store/menu'
    },
    {
      title: 'Chai Especiado',
      description: 'Té negro aromático con infusión de jengibre, cardamomo, canela y cremosa leche vaporizada.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
      link: '/store/menu'
    }
  ];

  combos: Combo[] = [
    {
      id: 'combo1',
      name: 'Combo Mañanero ☀️',
      description: 'Empieza tu día con la energía perfecta. Un café americano intenso acompañado de un panini caprese recién hecho.',
      price: 110,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
      tag: 'Desayuno',
      tagIcon: 'wb_sunny',
      items: [
        { name: 'Café Americano', icon: 'coffee' },
        { name: 'Panini Caprese', icon: 'lunch_dining' }
      ]
    },
    {
      id: 'combo2',
      name: 'Dulce Tentación 🍫',
      description: 'Para los amantes del chocolate: un capuchino cremoso con un pastel de chocolate supremo.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80',
      tag: 'Favorito',
      tagIcon: 'favorite',
      items: [
        { name: 'Capuchino Tradicional', icon: 'coffee' },
        { name: 'Pastel de Chocolate', icon: 'cake' }
      ]
    },
    {
      id: 'combo3',
      name: 'Refresh Total 🧊',
      description: 'El combo refrescante ideal para días calurosos: frappé de moka gourmet con smoothie de fresa.',
      price: 125,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80',
      tag: 'Refrescante',
      tagIcon: 'ac_unit',
      items: [
        { name: 'Frappé de Moka', icon: 'local_cafe' },
        { name: 'Smoothie de Fresa', icon: 'blender' }
      ]
    },
    {
      id: 'combo4',
      name: 'Pareja Gourmet 💑',
      description: '2 lattes cremosos + cheesecake de frutos rojos para compartir. Perfecto para dos personas.',
      price: 175,
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=600&q=80',
      tag: 'Para 2',
      tagIcon: 'group',
      items: [
        { name: '2x Latte Cremoso', icon: 'coffee' },
        { name: 'Cheesecake Frutos Rojos', icon: 'cake' }
      ]
    },
    {
      id: 'combo5',
      name: 'Antojo Completo 🌮',
      description: 'Tostadas de aguacate con huevo pochado + limonada de hierbabuena fresca. Nutritivo y delicioso.',
      price: 99,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      tag: 'Saludable',
      tagIcon: 'eco',
      items: [
        { name: 'Tostadas de Aguacate & Huevo', icon: 'egg_alt' },
        { name: 'Limonada de Hierbabuena', icon: 'local_bar' }
      ]
    },
    {
      id: 'combo6',
      name: 'Experiencia Premium ⭐',
      description: 'Ensalada César gourmet + espresso italiano + galletas artesanales. La experiencia completa.',
      price: 155,
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
      tag: 'Premium',
      tagIcon: 'star',
      items: [
        { name: 'Ensalada César Gourmet', icon: 'restaurant' },
        { name: 'Espresso Italiano', icon: 'coffee' },
        { name: 'Galletas Artesanales', icon: 'cookie' }
      ]
    }
  ];

  constructor(
    public productService: ProductService,
    private cartService: CartService
  ) {}

  get featuredProducts() {
    return this.productService.availableProducts().slice(0, 6);
  }

  get categories() {
    return this.productService.allCategories();
  }

  addComboToCart(combo: Combo): void {
    this.cartService.addItem({
      productId: combo.id,
      productName: combo.name,
      price: combo.price,
      quantity: 1,
      notes: `Combo: ${combo.items.map(i => i.name).join(' + ')}`,
      options: [],
      image: combo.image
    });

    this.addedCombo.set(combo.name);
    setTimeout(() => this.addedCombo.set(null), 3000);
  }

  next(): void {
    if (!this.sliderRef) return;
    const slider = this.sliderRef.nativeElement;
    const items = slider.querySelectorAll('.item');
    if (items.length > 0) {
      slider.appendChild(items[0]);
    }
  }

  prev(): void {
    if (!this.sliderRef) return;
    const slider = this.sliderRef.nativeElement;
    const items = slider.querySelectorAll('.item');
    if (items.length > 0) {
      slider.insertBefore(items[items.length - 1], items[0]);
    }
  }
}
