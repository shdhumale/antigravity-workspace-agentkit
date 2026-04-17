import { Component, OnInit, Output, EventEmitter } from '@angular/core';
export interface Ticket { id?: number; name: string; description: string; status: 'New' | 'Assigned' | 'Done' | 'Escalate'; }
import { TicketService } from '../../services/ticket.service';

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
              <th class="p-4 font-semibold text-slate-300 uppercase text-xs tracking-wider">Actions</th>
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
              <td class="p-4 flex gap-2">
                <button (click)="editTicket(ticket)" class="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                <button (click)="deleteTicket(ticket)" class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <app-ticket-stats [tickets]="tickets"></app-ticket-stats>
    </div>
  `
})
export class TicketDashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  @Output() onEdit = new EventEmitter<Ticket>();

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

  editTicket(ticket: Ticket): void {
    this.onEdit.emit(ticket);
  }

  deleteTicket(ticket: Ticket): void {
    if (ticket.id && confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(ticket.id).subscribe(() => this.refresh());
    }
  }
}
