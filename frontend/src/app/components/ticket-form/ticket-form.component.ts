import { Component, Output, EventEmitter } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  template: `
    <div class="glass-card p-6 w-full max-w-lg mx-auto">
      <h2 class="text-xl font-bold text-white mb-6">Create New Ticket</h2>
      <form (submit)="submit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-1">Ticket Name</label>
          <input [(ngModel)]="model.name" name="name" class="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. Bug in login flow">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-1">Description</label>
          <textarea [(ngModel)]="model.description" name="description" rows="4" class="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="Provide details..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-1">Status</label>
          <select [(ngModel)]="model.status" name="status" class="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option value="New">New</option>
            <option value="Assigned">Assigned</option>
            <option value="Done">Done</option>
            <option value="Escalate">Escalate</option>
          </select>
        </div>
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 active:transform active:scale-[0.98] transition-all text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20">
          Save Ticket
        </button>
      </form>
    </div>
  `
})
export class TicketFormComponent {
  @Output() onCreated = new EventEmitter<void>();
  model: Ticket = { name: '', description: '', status: 'New' };

  constructor(private ticketService: TicketService) {}

  submit(): void {
    if (this.model.name) {
      this.ticketService.createTicket(this.model).subscribe(() => {
        this.onCreated.emit();
        this.model = { name: '', description: '', status: 'New' };
      });
    }
  }
}
