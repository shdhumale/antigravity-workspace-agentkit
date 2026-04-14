import { Component, Output, EventEmitter } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-search',
  template: `
    <div class="relative group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-slate-500 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
      <input 
        (input)="search($any($event.target).value)" 
        type="text" 
        class="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64 transition-all"
        placeholder="Search tickets..."
      >
    </div>
  `
})
export class TicketSearchComponent {
  @Output() onSearch = new EventEmitter<Ticket[]>();

  constructor(private ticketService: TicketService) {}

  search(query: string): void {
    if (query.length > 2) {
      this.ticketService.searchTickets(query).subscribe(data => this.onSearch.emit(data));
    } else if (query.length === 0) {
      this.ticketService.getTickets().subscribe(data => this.onSearch.emit(data));
    }
  }
}
