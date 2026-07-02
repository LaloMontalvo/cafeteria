import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { ReportService } from '../../../core/services/report.service';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

@Component({
  selector: 'app-sales-report',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, HeaderComponent, StatCardComponent],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.css'
})
export class SalesReportComponent implements OnInit {
  weekTotal = 0;
  weekOrders = 0;
  avgTicket = 0;
  todaySales = 0;
  topProducts: { name: string; count: number; revenue: number }[] = [];
  catRevenue: { category: string; revenue: number }[] = [];

  barChartData!: ChartConfiguration<'bar'>['data'];
  barChartOptions!: ChartConfiguration<'bar'>['options'];

  constructor(public reportService: ReportService) {}

  ngOnInit(): void {
    this.weekTotal = this.reportService.getWeekTotal();
    this.weekOrders = this.reportService.getWeekOrders();
    this.avgTicket = this.reportService.getAverageTicket();
    this.todaySales = this.reportService.getTodaySales();
    this.topProducts = this.reportService.getTopProducts();
    this.catRevenue = this.reportService.getRevenueByCategory();
    this.initBarChart();
  }

  private initBarChart(): void {
    const dailySales = this.reportService.getDailySales();
    this.barChartData = {
      labels: dailySales.map(d => {
        const date = new Date(d.date);
        return date.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric' });
      }),
      datasets: [
        { label: 'Ventas ($)', data: dailySales.map(d => d.total), backgroundColor: 'rgba(111,78,55,0.75)', borderRadius: 8, barThickness: 32 },
        { label: 'Órdenes', data: dailySales.map(d => d.orders * 100), backgroundColor: 'rgba(212,165,116,0.6)', borderRadius: 8, barThickness: 32 }
      ]
    };
    this.barChartOptions = {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { font: { family: 'Inter' }, padding: 20, usePointStyle: true } },
        tooltip: { backgroundColor: '#2D1B0E', cornerRadius: 8, padding: 12 }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 12 }, color: '#7A6455' } },
        y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Inter', size: 12 }, color: '#7A6455', callback: v => '$' + Number(v).toLocaleString() } }
      }
    };
  }
}
