import { useState } from "react";
import { MessageCircle, Mail, Instagram, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const contactChannels = [
  {
    label: "WhatsApp",
    href: "https://wa.me/YOUR_WHATSAPP_NUMBER",
    icon: MessageCircle,
    description: "Instant support & orders",
    details: "Available 9 AM - 9 PM"
  },
  {
    label: "Email",
    href: "mailto:hello@snapstyles.lk",
    icon: Mail,
    description: "hello@snapstyles.lk",
    details: "Response within 24 hours"
  },
  {
    label: "Instagram",
    href: "https://instagram.com/snapstyles",
    icon: Instagram,
    description: "@snapstyles",
    details: "Daily updates & styling tips"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send to your backend/email service
    // For now, we'll redirect to WhatsApp with the message
    const whatsappMessage = `Hi Snap Styles,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    window.open(
      `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );

    toast({
      title: "Message sent!",
      description: "We've redirected you to WhatsApp to complete your message.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Reach out for orders, questions, 
            or just to say hello.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Channels */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Contact Channels</h2>
              {contactChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <Card 
                    key={channel.label}
                    className="transition-all hover:shadow-elegant animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardContent className="p-6">
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 w-full"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{channel.label}</h3>
                          <p className="text-foreground mb-1">{channel.description}</p>
                          <p className="text-sm text-muted-foreground">{channel.details}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Business Hours & Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>WhatsApp Support:</span>
                    <span className="text-muted-foreground">9 AM - 9 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email Response:</span>
                    <span className="text-muted-foreground">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing & Shipping:</span>
                    <span className="text-muted-foreground">Mon - Sat</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  We Deliver Across Sri Lanka
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Colombo Express Delivery</p>
                      <p className="text-sm text-muted-foreground">Same-day or next-day delivery within Colombo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Island-wide Shipping</p>
                      <p className="text-sm text-muted-foreground">2-4 business days to all provinces</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Required fields. Your message will be sent via WhatsApp for faster response.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-8 grid gap-4">
              <Button variant="whatsapp" size="lg" className="w-full" asChild>
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20want%20to%20place%20an%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Quick Order on WhatsApp
                </a>
              </Button>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20need%20sizing%20help."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Size Guide Help
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20want%20to%20return%20an%20item."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Return Request
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;