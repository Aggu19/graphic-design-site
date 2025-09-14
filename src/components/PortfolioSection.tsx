import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Star, MessageCircle } from "lucide-react";
import portfolioLogo from "@/assets/portfolio-logo-design.jpg";
import portfolioUI from "@/assets/portfolio-ui-design.jpg";
import portfolioTshirt from "@/assets/portfolio-tshirt-design.jpg";

const portfolioItems = [
  {
    id: 1,
    title: "Modern Tech Logo",
    category: "Logo Design",
    image: portfolioLogo,
    description: "Clean, modern logo for a tech startup",
    likes: 124,
    views: 892,
    rating: 4.9
  },
  {
    id: 2,
    title: "Coffee Shop Branding",
    category: "Brand Identity",
    image: portfolioLogo, 
    description: "Complete branding package for coffee shop",
    likes: 89,
    views: 567,
    rating: 4.8
  },
  {
    id: 3,
    title: "Mobile App UI",
    category: "UI/UX Design",
    image: portfolioUI,
    description: "Sleek mobile app interface design",
    likes: 203,
    views: 1234,
    rating: 5.0
  },
  {
    id: 4,
    title: "Festival T-Shirt",
    category: "T-Shirt Design",
    image: portfolioTshirt,
    description: "Vibrant festival t-shirt design",
    likes: 76,
    views: 445,
    rating: 4.7
  },
  {
    id: 5,
    title: "Business Card Set",
    category: "Print Design",
    image: portfolioLogo,
    description: "Elegant business card design",
    likes: 112,
    views: 678,
    rating: 4.9
  },
  {
    id: 6,
    title: "Social Media Kit",
    category: "Social Media",
    image: portfolioUI,
    description: "Instagram post template set",
    likes: 156,
    views: 923,
    rating: 4.8
  }
];

const categories = ["All", "Logo Design", "Brand Identity", "UI/UX Design", "T-Shirt Design", "Print Design", "Social Media"];

export const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const toggleLike = (itemId: number) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Design Portfolio</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our creative work and see what we can do for your brand.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="hover-scale"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group overflow-hidden hover:shadow-elegant transition-all animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 mr-1 ${likedItems.includes(item.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                  </Button>
                </div>
                
                <Badge className="absolute top-2 left-2 bg-accent">
                  {item.category}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {item.rating}
                    </span>
                  </div>
                  
                  <Button size="sm" variant="ghost" asChild>
                    <a
                      href={`https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi! I love the ${item.title} design. Can you create something similar for me?`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Hire Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Love what you see? Let's create something amazing together!
          </p>
          <Button size="lg" variant="whatsapp" asChild>
            <a
              href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Designs%2C%20I%20want%20to%20discuss%20a%20custom%20design%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2" />
              Start Your Project
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};