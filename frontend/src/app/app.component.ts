import { Component, ViewChild } from '@angular/core';
import { TicketDashboardComponent } from './components/ticket-dashboard/ticket-dashboard.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Navbar -->
      <nav class="border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <span class="font-bold text-xl tracking-tight">TicketHub</span>
          </div>
          <div class="flex items-center gap-8">
            <a (click)="view = 'dashboard'" class="cursor-pointer text-sm font-medium hover:text-blue-400 transition-colors" [class.text-blue-500]="view === 'dashboard'">Dashboard</a>
            <a (click)="view = 'create'" class="cursor-pointer text-sm font-medium hover:text-blue-400 transition-colors" [class.text-blue-500]="view === 'create'">Create New</a>
          </div>
        </div>
      </nav>

      <!-- Content -->
      <main class="flex-1 max-w-7xl w-full mx-auto p-4 py-8">
        <app-ticket-dashboard *ngIf="view === 'dashboard'" #dashboard></app-ticket-dashboard>
        <app-ticket-form *ngIf="view === 'create'" (onCreated)="onTicketCreated()"></app-ticket-form>
      </main>

      <!-- Footer -->
      <footer class="border-t border-white/5 py-8 mt-12">
        <div class="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; 2026 TicketHub Systems. All rights reserved. Built with Antigravity.
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  view: 'dashboard' | 'create' = 'dashboard';
  @ViewChild('dashboard') dashboard?: TicketDashboardComponent;

  onTicketCreated(): void {
    this.view = 'dashboard';
  }
}
