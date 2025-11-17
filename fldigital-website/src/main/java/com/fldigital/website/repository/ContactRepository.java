package com.fldigital.website.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fldigital.website.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    
    /**
     * Find all unprocessed contacts
     */
    List<Contact> findByProcessedFalseOrderByCreatedAtDesc();
    
    /**
     * Find contacts created after a specific date
     */
    List<Contact> findByCreatedAtAfterOrderByCreatedAtDesc(LocalDateTime date);
    
    /**
     * Find contacts by email
     */
    List<Contact> findByEmailOrderByCreatedAtDesc(String email);
    
    /**
     * Count unprocessed contacts
     */
    @Query("SELECT COUNT(c) FROM Contact c WHERE c.processed = false")
    long countUnprocessedContacts();
    
    /**
     * Find recent contacts (last 30 days)
     */
    @Query("SELECT c FROM Contact c WHERE c.createdAt >= :thirtyDaysAgo ORDER BY c.createdAt DESC")
    List<Contact> findRecentContacts(LocalDateTime thirtyDaysAgo);
}