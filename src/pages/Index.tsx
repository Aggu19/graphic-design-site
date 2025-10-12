import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { BiddingCard } from "@/components/BiddingCard";
import { PortfolioSection } from "@/components/PortfolioSection";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Truck, Shield, Star, Palette, Zap, Award, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import heroImage from "@/assets/hero-fashion.jpg";

const features = [
  {
    title: "Custom Designs",
    description: "Tailored designs that match your vision perfectly.",
    icon: Palette
  },
  {
    title: "Quick Quotes",
    description: "Get instant quotes and discuss projects on WhatsApp.",
    icon: Zap
  },
  {
    title: "Fast Turnaround",
    description: "Quality designs delivered within 3-7 days.",
    icon: Award
  }
];

const testimonials = [
  { name: "Aisha", quote: "Amazing logo design! Exactly what I envisioned." },
  { name: "Ravi", quote: "Professional UI design, boosted our conversions by 40%." },
  { name: "Priya", quote: "Creative t-shirt designs that our customers love!" }
];

const Index = () => {
  const featuredProducts = getFeaturedProducts(6);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion Hero"
            className={`w-full h-full object-cover transition-all duration-300 blur-sm ${
              scrollY > 50 
                ? 'opacity-20 sm:opacity-25 md:opacity-30' 
                : 'opacity-40 sm:opacity-50 md:opacity-60'
            }`}
          />
          <div className={`absolute inset-0 transition-all duration-300 backdrop-blur-sm ${
            scrollY > 50 
              ? 'bg-gradient-to-br from-black/50 via-black/40 to-black/30' 
              : 'bg-gradient-to-br from-black/30 via-black/20 to-transparent'
          }`} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in py-12 sm:py-16 lg:py-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg mb-4 sm:mb-6 leading-tight">
              Design made simple.
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-md mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Custom designs. Quick quotes. Professional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button size="lg" asChild className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto bg-white text-gray-900 hover:bg-white/90 shadow-lg">
                <Link to="/products">View Services</Link>
              </Button>
              <Button 
                size="lg" 
                asChild
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto bg-black/80 text-white hover:bg-black/90 shadow-lg backdrop-blur-sm"
              >
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Designs%2C%20I%20need%20a%20custom%20design%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Get Quote
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Snap Designs?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional design solutions with transparent pricing and quick delivery.
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

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Popular Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-muted-foreground text-lg">
              Our most requested design services loved by clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Bidding Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">🔥 Live Bidding Projects</h3>
              <p className="text-muted-foreground">
                Get amazing designs at competitive prices! Place your bid now.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.slice(3, 6).map((product, index) => (
                <div 
                  key={`bidding-${product.id}`} 
                  className="animate-fade-in" 
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <BiddingCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">View All Services</Link>
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
            Ready to bring your vision to life?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Get custom designs that perfectly represent your brand. 
            Quick quotes, fast delivery, unlimited revisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">Browse Services</Link>
            </Button>
            <Button size="lg" variant="whatsapp" asChild>
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Designs%2C%20I%20need%20a%20design%20quote."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2" />
                Get Quote
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;