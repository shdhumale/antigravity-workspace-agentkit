import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ticket } from '../../services/ticket.service';

interface StatusCount {
  status: string;
  count: number;
  color: string;
  bgClass: string;
  textClass: string;
}

@Component({
  selector: 'app-ticket-stats',
  template: `
    <div class="glass-card p-6 mt-6">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <!-- Donut Chart -->
        <div class="relative w-48 h-48 flex-shrink-0">
          <div class="w-full h-full rounded-full"
               [style.background]="'conic-gradient(' + chartGradient + ')'">
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-32 h-32 rounded-full bg-slate-900/90 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold text-white">{{ totalTickets }}</span>
              <span class="text-xs text-slate-400 uppercase tracking-wide">Total</span>
            </div>
          </div>
        </div>
        
        <!-- Legend -->
        <div class="flex-1 w-full">
          <h3 class="text-lg font-semibold text-white mb-4">Ticket Status Overview</h3>
          <div class="grid grid-cols-2 gap-4">
            @for (item of statusCounts; track item.status) {
              <div class="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div class="w-3 h-3 rounded-full" [class]="item.bgClass"></div>
                <div class="flex-1">
                  <div class="text-sm text-slate-300">{{ item.status }}</div>
                  <div class="text-lg font-bold" [class]="item.textClass">{{ item.count }}</div>
                </div>
                <div class="text-sm text-slate-500">
                  {{ totalTickets > 0 ? ((item.count / totalTickets) * 100 | number:'1.0-0') : 0 }}%
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class TicketStatsComponent implements OnChanges {
  @Input() tickets: Ticket[] = [];
  
  statusCounts: StatusCount[] = [];
  totalTickets = 0;
  chartGradient = '';

  private statusColors: Record<string, { color: string; bgClass: string; textClass: string }> = {
    'New': { color: '#3b82f6', bgClass: 'bg-blue-500', textClass: 'text-blue-400' },
    'Assigned': { color: '#f59e0b', bgClass: 'bg-yellow-500', textClass: 'text-yellow-400' },
    'Done': { color: '#22c55e', bgClass: 'bg-green-500', textClass: 'text-green-400' },
    'Escalate': { color: '#ef4444', bgClass: 'bg-red-500', textClass: 'text-red-400' }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tickets']) {
      this.calculateStats();
    }
  }

  private calculateStats(): void {
    const statusList = ['New', 'Assigned', 'Done', 'Escalate'];
    this.totalTickets = this.tickets.length;
    
    this.statusCounts = statusList.map(status => {
      const count = this.tickets.filter(t => t.status === status).length;
      const colors = this.statusColors[status];
      return {
        status,
        count,
        color: colors.color,
        bgClass: colors.bgClass,
        textClass: colors.textClass
      };
    });

    this.buildChartGradient();
  }

  private buildChartGradient(): void {
    if (this.totalTickets === 0) {
      this.chartGradient = '#64748b 0deg 360deg';
      return;
    }

    const gradients: string[] = [];
    let currentDegree = 0;

    this.statusCounts.forEach((item, index) => {
      if (item.count > 0) {
        const degrees = (item.count / this.totalTickets) * 360;
        gradients.push(`${item.color} ${currentDegree}deg ${currentDegree + degrees}deg`);
        currentDegree += degrees;
      }
    });

    this.chartGradient = gradients.join(', ');
  }
}
