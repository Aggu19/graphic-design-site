import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Truck, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import heroImage from "@/assets/hero-fashion.jpg";

const features = [
  {
    title: "Transparent Pricing",
    description: "No surprises—see prices upfront.",
    icon: Shield
  },
  {
    title: "WhatsApp Orders",
    description: "Ask questions and confirm orders instantly.",
    icon: MessageCircle
  },
  {
    title: "Fast Delivery",
    description: "Island-wide shipping within 2–4 days.",
    icon: Truck
  }
];

const testimonials = [
  { name: "Aisha", quote: "Super easy to order via WhatsApp!" },
  { name: "Ravi", quote: "Quality products and quick delivery." },
  { name: "Priya", quote: "Love the transparent pricing!" }
];

const Index = () => {
  const featuredProducts = getFeaturedProducts(6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion Hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Style made easy.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse. Tap. Order on WhatsApp. Fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero" asChild className="text-lg px-8 py-4 h-auto">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button 
                size="lg" 
                variant="whatsapp" 
                asChild
                className="text-lg px-8 py-4 h-auto"
              >
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20want%20to%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2" />
                  Order on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Snap Styles?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make fashion simple with transparent pricing and instant ordering.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center p-8 hover:shadow-elegant transition-all animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <CardContent className="p-0">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Sellers</h2>
            <p className="text-muted-foreground text-lg">
              Discover our most popular items loved by customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by customers</h2>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="ml-2 text-muted-foreground">4.9/5 from 500+ reviews</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="p-6 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="font-semibold text-accent">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium">{testimonial.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to upgrade your style?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Browse our collection and order instantly via WhatsApp. 
            Fast delivery, hassle-free returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">Browse Collection</Link>
            </Button>
            <Button size="lg" variant="whatsapp" asChild>
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20want%20to%20order."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2" />
                Order Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;