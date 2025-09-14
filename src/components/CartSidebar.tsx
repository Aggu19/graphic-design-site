import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";

export const CartSidebar = () => {
  const { 
    state, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    setCartOpen, 
    itemCount, 
    total, 
    getWhatsAppUrl 
  } = useCart();

  const handleWhatsAppOrder = () => {
    if (state.items.length === 0) return;
    
    const url = getWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={state.isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={() => setCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {state.items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-md object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-product.jpg";
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      {item.variants && Object.keys(item.variants).length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {Object.entries(item.variants).map(([key, value]) => 
                            `${key}: ${value}`
                          ).join(", ")}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-medium text-sm">
                          Rs {item.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          Total: Rs {(item.price * item.quantity).toLocaleString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs p-1 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>Rs {total.toLocaleString()}</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Shipping calculated on WhatsApp confirmation.
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    variant="whatsapp"
                    onClick={handleWhatsAppOrder}
                    disabled={state.items.length === 0}
                  >
                    Order on WhatsApp
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCartOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};