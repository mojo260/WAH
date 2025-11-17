package com.fldigital.website.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("pageTitle", "WAH - Specialists in Digital Marketing");
        model.addAttribute("metaDescription", "WAH - Your digital partner for growth. We specialize in Google Ads, SEO, Meta Ads, LinkedIn Ads, and custom websites.");
        return "index";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("pageTitle", "About WAH - Our Story");
        model.addAttribute("metaDescription", "Learn about WAH's journey and commitment to digital marketing excellence.");
        return "about";
    }

    @GetMapping("/services")
    public String services(Model model) {
        model.addAttribute("pageTitle", "Our Services - WAH");
        model.addAttribute("metaDescription", "Discover our comprehensive digital marketing services including Google Ads, SEO, Meta Ads, and more.");
        return "services";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("pageTitle", "Contact FL Digital");
        model.addAttribute("metaDescription", "Get in touch with FL Digital for your digital marketing needs.");
        return "contact-form";
    }
}