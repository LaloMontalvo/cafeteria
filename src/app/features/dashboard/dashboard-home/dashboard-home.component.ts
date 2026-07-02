import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  BarController,
  LineController,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

import { HeaderComponent } from '../../../shared/components/header/header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { OrderService } from '../../../core/services/order.service';
import { TableService } from '../../../core/services/table.service';
import { ProductService } from '../../../core/services/product.service';
import { ReportService } from '../../../core/services/report.service';

Chart.register(
  CategoryScale, LinearScale, BarElement, LineElement, PointElement,
  ArcElement, BarController, LineController, DoughnutController,
  Title, Tooltip, Legend, Filler
);

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective, HeaderComponent, StatCardComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit {

  // Stats
  todaySales = 0;
  activeOrders = 0;
  occupiedTables = 0;
  totalProducts = 0;

  // Chart data
  salesChartData!: ChartConfiguration<'line'>['data'];
  salesChartOptions!: ChartConfiguration<'line'>['options'];

  categoryChartData!: ChartConfiguration<'doughnut'>['data'];
  categoryChartOptions!: ChartConfiguration<'doughnut'>['options'];

  topProducts: { name: string; count: number; revenue: number }[] = [];

  constructor(
    public orderService: OrderService,
    public tableService: TableService,
    public productService: ProductService,
    public reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.todaySales = this.reportService.getTodaySales();
    this.activeOrders = this.orderService.activeOrders().length;
    this.occupiedTables = this.tableService.occupiedCount();
    this.totalProducts = this.productService.productCount();
    this.topProducts = this.reportService.getTopProducts();

    this.initSalesChart();
    this.initCategoryChart();
  }

  private initSalesChart(): void {
    const dailySales = this.reportService.getDailySales();
    const labels = dailySales.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric' });
    });
    const data = dailySales.map(d => d.total);

    this.salesChartData = {
      labels,
      datasets: [{
        label: 'Ventas ($)',
        data,
        borderColor: '#6F4E37',
        backgroundColor: 'rgba(111, 78, 55, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6F4E37',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      }]
    };

    this.salesChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#2D1B0E',
          titleFont: { family: 'Inter' },
          bodyFont: { family: 'Inter' },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => `$${(ctx.parsed.y ?? 0).toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 12 }, color: '#7A6455' }
        },
        y: {
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: {
            font: { family: 'Inter', size: 12 },
            color: '#7A6455',
            callback: (val) => '$' + Number(val).toLocaleString()
          }
        }
      }
    };
  }

  private initCategoryChart(): void {
    const catRevenue = this.reportService.getRevenueByCategory();
    const colors = ['#6F4E37', '#D4A574', '#C8956C', '#4CAF50', '#2196F3', '#E91E63'];

    this.categoryChartData = {
      labels: catRevenue.map(c => c.category),
      datasets: [{
        data: catRevenue.map(c => c.revenue),
        backgroundColor: colors.slice(0, catRevenue.length),
        borderWidth: 0,
        hoverOffset: 8
      }]
    };

    this.categoryChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 16,
            font: { family: 'Inter', size: 12 },
            usePointStyle: true,
            pointStyleWidth: 8
          }
        },
        tooltip: {
          backgroundColor: '#2D1B0E',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => `${ctx.label}: $${ctx.parsed.toLocaleString()}`
          }
        }
      }
    };
  }

  getOrderStatusColor(status: string): string {
    const map: Record<string, string> = {
      pending: '#FF9800',
      preparing: '#2196F3',
      ready: '#4CAF50',
      delivered: '#9E9E9E',
      cancelled: '#E53935'
    };
    return map[status] || '#9E9E9E';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendiente',
      preparing: 'En preparación',
      ready: 'Listo',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return map[status] || status;
  }

  getMinutesAgo(date: Date): number {
    return Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  }
}
