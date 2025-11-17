package com.fldigital.website.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fldigital.website.entity.Contact;
import com.fldigital.website.service.ContactService;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/form")
    public String showContactForm(Model model) {
        model.addAttribute("contact", new Contact());
        model.addAttribute("pageTitle", "Contact WAH");
        model.addAttribute("metaDescription", "Get in touch with WAH for your digital marketing needs.");
        return "contact-form";
    }

    @PostMapping("/submit")
    public String submitContact(@Valid @ModelAttribute("contact") Contact contact,
                              BindingResult bindingResult,
                              Model model,
                              RedirectAttributes redirectAttributes) {
        
        if (bindingResult.hasErrors()) {
            model.addAttribute("pageTitle", "Contact WAH");
            model.addAttribute("metaDescription", "Get in touch with WAH for your digital marketing needs.");
            model.addAttribute("errorMessage", "Please correct the errors below.");
            return "contact-form";
        }

        try {
            contactService.saveContact(contact);
            redirectAttributes.addFlashAttribute("successMessage", 
                "Thank you for your message! We'll get back to you within 24 hours.");
            redirectAttributes.addFlashAttribute("contactName", contact.getName());
            return "redirect:/contact/success";
        } catch (Exception e) {
            model.addAttribute("pageTitle", "Contact WAH");
            model.addAttribute("metaDescription", "Get in touch with WAH for your digital marketing needs.");
            model.addAttribute("errorMessage", "Sorry, there was an error sending your message. Please try again.");
            return "contact-form";
        }
    }

    @GetMapping("/success")
    public String showSuccessPage(Model model) {
        model.addAttribute("pageTitle", "Message Sent Successfully - WAH");
        model.addAttribute("metaDescription", "Your message has been sent successfully to WAH.");
        return "success";
    }

    // Admin endpoint to view contacts (optional, for development)
    @GetMapping("/admin/list")
    public String listContacts(Model model) {
        model.addAttribute("contacts", contactService.getAllContacts());
        model.addAttribute("unprocessedCount", contactService.countUnprocessedContacts());
        model.addAttribute("pageTitle", "Contact Admin - WAH");
        return "admin/contact-list";
    }

    @PostMapping("/admin/{id}/process")
    public String markAsProcessed(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            contactService.markAsProcessed(id);
            redirectAttributes.addFlashAttribute("successMessage", "Contact marked as processed.");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error processing contact.");
        }
        return "redirect:/contact/admin/list";
    }
}