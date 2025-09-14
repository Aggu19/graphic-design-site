import { Link } from "react-router-dom";
import { Instagram, Mail, MessageCircle } from "lucide-react";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socialLinks = [
  { 
    label: "WhatsApp", 
    href: "https://wa.me/YOUR_WHATSAPP_NUMBER", 
    icon: MessageCircle 
  },
  { 
    label: "Email", 
    href: "mailto:hello@snapstyles.lk", 
    icon: Mail 
  },
  { 
    label: "Instagram", 
    href: "https://instagram.com/snapstyles", 
    icon: Instagram 
  },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-sm font-bold text-accent-foreground">S</span>
              </div>
              <span className="text-xl font-bold">Snap Styles</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Look sharp. Shop simple. Quality fashion with transparent pricing 
              and instant WhatsApp ordering.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/60 hover:text-accent transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20need%20help."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@snapstyles.lk"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Email Us
                </a>
              </li>
              <li>
                <span className="text-primary-foreground/80">
                  2-4 Day Delivery
                </span>
              </li>
              <li>
                <span className="text-primary-foreground/80">
                  7 Day Returns
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Snap Styles. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};