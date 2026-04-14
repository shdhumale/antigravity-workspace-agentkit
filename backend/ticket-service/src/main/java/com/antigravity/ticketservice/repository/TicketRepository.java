package com.antigravity.ticketservice.repository;

import com.antigravity.ticketservice.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}
