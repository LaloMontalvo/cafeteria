import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card" [style.--accent]="accentColor">
      <div class="stat-icon-wrap">
        <span class="material-icons-round">{{ icon }}</span>
      </div>
      <div class="stat-info">
        <span class="stat-value">{{ prefix }}{{ value }}{{ suffix }}</span>
        <span class="stat-label">{{ label }}</span>
      </div>
      <div class="stat-trend" *ngIf="trend" [class.positive]="trendPositive" [class.negative]="!trendPositive">
        <span class="material-icons-round trend-icon">{{ trendPositive ? 'trending_up' : 'trending_down' }}</span>
        <span>{{ trend }}</span>
      </div>
    </div>
  `,
  styles: [`
    .stat-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 24px;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      position: relative;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    }
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--accent, var(--color-primary));
      border-radius: 4px 0 0 4px;
    }
    .stat-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--accent, var(--color-primary)) 12%, transparent);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .stat-icon-wrap .material-icons-round {
      font-size: 24px;
      color: var(--accent, var(--color-primary));
    }
    .stat-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .stat-value {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--color-text);
      font-family: var(--font-heading);
      line-height: 1;
    }
    .stat-label {
      font-size: 0.82rem;
      color: var(--color-text-light);
      font-weight: 500;
    }
    .stat-trend {
      position: absolute;
      top: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 8px;
    }
    .stat-trend.positive {
      color: var(--color-success);
      background: rgba(76, 175, 80, 0.1);
    }
    .stat-trend.negative {
      color: var(--color-danger);
      background: rgba(229, 57, 53, 0.1);
    }
    .trend-icon {
      font-size: 16px;
    }
  `]
})
export class StatCardComponent {
  @Input() icon = 'analytics';
  @Input() value: string | number = '0';
  @Input() label = '';
  @Input() accentColor = '';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() trend = '';
  @Input() trendPositive = true;
}
