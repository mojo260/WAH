package com.fldigital.website.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fldigital.website.entity.Contact;
import com.fldigital.website.repository.ContactRepository;

@Service
@Transactional
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    /**
     * Save a new contact inquiry
     */
    public Contact saveContact(Contact contact) {
        // Ensure created timestamp is set
        if (contact.getCreatedAt() == null) {
            contact.setCreatedAt(LocalDateTime.now());
        }
        
        // Set default processed status
        if (contact.getProcessed() == null) {
            contact.setProcessed(false);
        }
        
        return contactRepository.save(contact);
    }

    /**
     * Get all unprocessed contacts
     */
    @Transactional(readOnly = true)
    public List<Contact> getUnprocessedContacts() {
        return contactRepository.findByProcessedFalseOrderByCreatedAtDesc();
    }

    /**
     * Get contact by ID
     */
    @Transactional(readOnly = true)
    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    /**
     * Mark contact as processed
     */
    public Contact markAsProcessed(Long contactId) {
        Optional<Contact> contactOpt = contactRepository.findById(contactId);
        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            contact.setProcessed(true);
            return contactRepository.save(contact);
        }
        throw new RuntimeException("Contact not found with ID: " + contactId);
    }

    /**
     * Get all contacts
     */
    @Transactional(readOnly = true)
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    /**
     * Get recent contacts (last 30 days)
     */
    @Transactional(readOnly = true)
    public List<Contact> getRecentContacts() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        return contactRepository.findRecentContacts(thirtyDaysAgo);
    }

    /**
     * Count unprocessed contacts
     */
    @Transactional(readOnly = true)
    public long countUnprocessedContacts() {
        return contactRepository.countUnprocessedContacts();
    }

    /**
     * Find contacts by email
     */
    @Transactional(readOnly = true)
    public List<Contact> findContactsByEmail(String email) {
        return contactRepository.findByEmailOrderByCreatedAtDesc(email);
    }
}