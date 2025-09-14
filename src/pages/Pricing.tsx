import { MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  {
    name: "Basic Tee",
    price: "Rs 2,500",
    originalPrice: "Rs 3,000",
    features: ["100% cotton", "S–XL sizes", "3 color options", "Machine washable"],
    cta: { 
      text: "Order on WhatsApp", 
      href: "https://wa.me/YOUR_WHATSAPP_NUMBER?text=I%20want%20the%20Basic%20Tee" 
    },
    popular: false
  },
  {
    name: "Premium Shirt",
    price: "Rs 4,900",
    originalPrice: "Rs 5,900",
    features: ["Wrinkle-resistant fabric", "Tailored fit", "Button-down collar", "Professional quality"],
    cta: { 
      text: "Order on WhatsApp", 
      href: "https://wa.me/YOUR_WHATSAPP_NUMBER?text=I%20want%20the%20Premium%20Shirt" 
    },
    popular: true
  },
  {
    name: "Hoodie",
    price: "Rs 6,900",
    originalPrice: "Rs 8,000",
    features: ["Fleece lined", "Unisex design", "Kangaroo pocket", "Drawstring hood"],
    cta: { 
      text: "Order on WhatsApp", 
      href: "https://wa.me/YOUR_WHATSAPP_NUMBER?text=I%20want%20the%20Hoodie" 
    },
    popular: false
  }
];

const bulkDiscounts = [
  { quantity: "3-5 items", discount: "10% off", code: "BULK10" },
  { quantity: "6-10 items", discount: "15% off", code: "BULK15" },
  { quantity: "11+ items", discount: "20% off", code: "BULK20" },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple pricing per item. No hidden costs, no surprises. 
            Bulk discounts available on WhatsApp.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Main Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative transition-all hover:shadow-elegant animate-fade-in ${
                plan.popular ? 'border-accent shadow-glow scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-accent-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <Badge variant="secondary" className="text-xs">
                      Save Rs {parseInt(plan.originalPrice.replace(/[^\d]/g, '')) - parseInt(plan.price.replace(/[^\d]/g, ''))}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'variant-hero' : ''}`}
                  variant={plan.popular ? "hero" : "whatsapp"}
                  asChild
                >
                  <a
                    href={plan.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {plan.cta.text}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk Discounts */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Bulk Discounts</CardTitle>
            <p className="text-muted-foreground">
              Order multiple items and save more! Contact us on WhatsApp to apply discounts.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {bulkDiscounts.map((discount, index) => (
                <Card key={discount.code} className="text-center p-6 border-accent/20">
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-lg mb-2">{discount.quantity}</h3>
                    <p className="text-2xl font-bold text-accent mb-2">{discount.discount}</p>
                    <Badge variant="outline">{discount.code}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="whatsapp" size="lg" asChild>
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20want%20to%20order%20multiple%20items%20for%20bulk%20discount."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Get Bulk Discount
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-accent" />
                Why Order on WhatsApp?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Instant confirmation and support</li>
                <li>• Ask questions about sizing, colors, fit</li>
                <li>• Custom orders and special requests</li>
                <li>• Easy payment coordination</li>
                <li>• Real-time delivery updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What's Included?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• High-quality materials and construction</li>
                <li>• Professional packaging</li>
                <li>• Care instructions included</li>
                <li>• 7-day return policy</li>
                <li>• Customer support via WhatsApp</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get started by browsing our collection or contact us directly for personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" asChild>
              <a href="/products">Browse Collection</a>
            </Button>
            <Button size="lg" variant="whatsapp" asChild>
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20need%20help%20choosing%20the%20right%20products."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Get Recommendations
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;