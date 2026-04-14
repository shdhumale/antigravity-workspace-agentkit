import { Component, OnInit } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-dashboard',
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-white tracking-tight">Ticket Dashboard</h1>
        <div class="flex gap-4">
           <app-ticket-search (onSearch)="handleSearch($event)"></app-ticket-search>
        </div>
      </div>

      <div class="glass-card overflow-hidden">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-white/5 border-b border-white/10">
              <th class="p-4 font-semibold text-slate-300 uppercase text-xs tracking-wider">ID</th>
              <th class="p-4 font-semibold text-slate-300 uppercase text-xs tracking-wider">Name</th>
              <th class="p-4 font-semibold text-slate-300 uppercase text-xs tracking-wider">Description</th>
              <th class="p-4 font-semibold text-slate-300 uppercase text-xs tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ticket of tickets" class="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td class="p-4 text-slate-400 font-mono text-sm">#{{ticket.id}}</td>
              <td class="p-4 text-white font-medium">{{ticket.name}}</td>
              <td class="p-4 text-slate-400">{{ticket.description}}</td>
              <td class="p-4">
                <span [ngClass]="{
                  'bg-blue-500/10 text-blue-400 border-blue-500/20': ticket.status === 'New',
                  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20': ticket.status === 'Assigned',
                  'bg-green-500/10 text-green-400 border-green-500/20': ticket.status === 'Done',
                  'bg-red-500/10 text-red-400 border-red-500/20': ticket.status === 'Escalate'
                }" class="px-2 py-1 rounded text-xs font-semibold border">
                  {{ticket.status}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class TicketDashboardComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.ticketService.getTickets().subscribe(data => this.tickets = data);
  }

  handleSearch(results: Ticket[]): void {
    this.tickets = results;
  }
}
