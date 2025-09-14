import { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, MessageCircle, Share2, Heart, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { getProductById, products } from "@/data/products";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductById(slug) : null;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const { addItem } = useCart();

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }));
  };

  const handleAddToCart = () => {
    // Check if all variants are selected
    if (product.variants) {
      const missingVariants = product.variants.filter(
        variant => !selectedVariants[variant.name]
      );
      
      if (missingVariants.length > 0) {
        toast({
          title: "Please select all options",
          description: `Please select: ${missingVariants.map(v => v.name).join(", ")}`,
          variant: "destructive"
        });
        return;
      }
    }

    addItem({
      id: `${product.id}-${JSON.stringify(selectedVariants)}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      variants: selectedVariants,
      quantity: quantity
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart.`,
    });
  };

  const handleWhatsAppOrder = () => {
    const variantText = Object.entries(selectedVariants)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");
    
    const message = `Hi Snap Styles! I want to order:\n${quantity}x ${product.name}${variantText ? ` (${variantText})` : ''} — Rs ${product.price * quantity}\nTotal: Rs ${product.price * quantity}`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(
      `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-accent">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.images[currentImageIndex] || "/placeholder-product.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-product.jpg";
                  }}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                </Button>
              </div>
            </Card>
            
            {/* Image thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`flex-1 aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-accent' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.9)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="text-sm text-muted-foreground mt-1">SKU: {product.sku}</p>
            </div>

            {/* Price */}
            <div>
              <span className="text-3xl font-bold text-foreground">
                Rs {product.price.toLocaleString()}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                Inclusive of all taxes • Free delivery over Rs 5,000
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <label className="text-sm font-medium mb-2 block">
                      {variant.name}
                    </label>
                    <Select
                      value={selectedVariants[variant.name] || ""}
                      onValueChange={(value) => handleVariantChange(variant.name, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${variant.name}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {variant.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart • Rs {(product.price * quantity).toLocaleString()}
              </Button>
              
              <Button 
                size="lg" 
                variant="whatsapp" 
                className="w-full"
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Order on WhatsApp
              </Button>

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Product
              </Button>
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Features</h3>
                  <div className="space-y-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Delivery & Returns</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Free delivery for orders over Rs 5,000</p>
                  <p>• Standard delivery: 2-4 business days</p>
                  <p>• Express delivery available in Colombo</p>
                  <p>• 7-day return policy for unworn items</p>
                  <p>• Order via WhatsApp for instant confirmation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-8" />
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;