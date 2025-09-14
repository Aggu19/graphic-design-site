import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppFAB = () => {
  const handleClick = () => {
    window.open(
      "https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20want%20to%20order.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-whatsapp hover:bg-whatsapp/90 shadow-glow transition-all duration-300 hover:scale-110"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 text-whatsapp-foreground" />
    </Button>
  );
};