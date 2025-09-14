import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Tap 'Order on WhatsApp,' send your cart, and we'll confirm your order details, including size, color preferences, and delivery information."
  },
  {
    question: "What are delivery times?",
    answer: "Typically 2-4 days island-wide. Express delivery is available in Colombo within 24 hours for an additional fee."
  },
  {
    question: "Do you accept returns?",
    answer: "Yes, within 7 days for unworn items with original tags. Contact us on WhatsApp to initiate a return."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bank transfers, mobile payments, and cash on delivery. Payment details will be shared via WhatsApp after order confirmation."
  },
  {
    question: "How do I know what size to order?",
    answer: "Each product page includes detailed size information. You can also message us on WhatsApp for personalized sizing advice."
  },
  {
    question: "Are there bulk discounts available?",
    answer: "Yes! We offer 10-20% discounts for bulk orders (3+ items). Contact us on WhatsApp for custom pricing on larger orders."
  },
  {
    question: "Can I customize or request specific colors?",
    answer: "Absolutely! We often accommodate custom requests. Send us a message on WhatsApp with your requirements."
  },
  {
    question: "Is there a warranty on your products?",
    answer: "We stand behind our quality. If you receive a defective item, we'll replace it free of charge within 30 days."
  },
  {
    question: "Do you ship outside Sri Lanka?",
    answer: "Currently, we only ship within Sri Lanka. We're working on international shipping – contact us for updates!"
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, we'll send tracking information via WhatsApp. You can also message us anytime for status updates."
  }
];

const FAQs = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers! Can't find what you're looking for? 
            Message us on WhatsApp.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Quick Contact Card */}
        <Card className="mb-12 bg-accent/5 border-accent/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our team is available on WhatsApp to help you with anything you need.
            </p>
            <Button variant="whatsapp" size="lg" asChild>
              <a
                href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Accordion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-lg px-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Additional Help Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Order Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Need help with sizing, colors, or placing an order? Our team is here to help!
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20need%20help%20with%20my%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Order Help
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Size Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Unsure about sizing? We provide detailed measurements and personalized recommendations.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20need%20help%20with%20sizing."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Sizing Help
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Other Ways to Reach Us</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">WhatsApp</h4>
                <p className="text-sm text-muted-foreground">
                  Instant responses<br />
                  Available 9 AM - 9 PM
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Email</h4>
                <p className="text-sm text-muted-foreground">
                  hello@snapstyles.lk<br />
                  Response within 24 hours
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Instagram</h4>
                <p className="text-sm text-muted-foreground">
                  @snapstyles<br />
                  Daily updates & styling tips
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQs;