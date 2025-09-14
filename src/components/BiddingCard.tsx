import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Product } from "./ProductCard";

interface BiddingCardProps {
  product: Product;
  className?: string;
}

export const BiddingCard = ({ product, className = "" }: BiddingCardProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid] = useState(product.price * 0.7); // Start at 70% of base price
  const [bidCount] = useState(Math.floor(Math.random() * 8) + 3); // Random bid count
  const [timeLeft] = useState("2h 34m"); // Mock time left

  const handleBidSubmit = () => {
    if (!bidAmount || parseInt(bidAmount) <= currentBid) {
      return;
    }
    
    const message = `Hi Snap Designs! I want to bid Rs ${bidAmount} for the ${product.name} service. My requirements: [Please describe your project details here]`;
    const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className={`overflow-hidden hover:shadow-elegant transition-all ${className}`}>
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-primary flex items-center justify-center">
        <div className="text-white text-center p-4">
          <div className="text-xl font-bold mb-2">{product.name}</div>
          <div className="text-sm opacity-80">{product.category}</div>
        </div>
        
        {/* Bidding Badge */}
        <Badge className="absolute top-2 right-2 bg-green-500 animate-pulse">
          Live Bidding
        </Badge>
        
        {/* Time Left */}
        <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1 text-white text-xs flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {timeLeft}
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Bid Info */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current Bid</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {bidCount} bids
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">Rs {currentBid.toLocaleString()}</span>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              Active
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Starting at Rs {(product.price * 0.5).toLocaleString()} • Buy now Rs {product.price.toLocaleString()}
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="text-sm font-medium mb-2">What's Included:</h4>
          <ul className="space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Bidding Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Bid (Rs)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder={`Min: ${currentBid + 500}`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={currentBid + 500}
            />
            <Button 
              onClick={handleBidSubmit}
              disabled={!bidAmount || parseInt(bidAmount) <= currentBid}
              className="whitespace-nowrap"
            >
              Place Bid
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Minimum bid: Rs {(currentBid + 500).toLocaleString()}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            asChild
          >
            <a
              href={`https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi! I want to buy ${product.name} at the fixed price of Rs ${product.price.toLocaleString()}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now Rs {product.price.toLocaleString()}
            </a>
          </Button>
          <Button 
            variant="whatsapp" 
            size="sm"
            asChild
          >
            <a
              href={`https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi! I have questions about the ${product.name} bidding.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};