import { FileText, MessageCircle, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our services. 
            By ordering from Snap Styles, you agree to these terms.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: September 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Quick Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Key Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <MessageCircle className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">WhatsApp Orders</h3>
                <p className="text-sm text-muted-foreground">
                  All orders are placed via WhatsApp
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Order Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  Orders are confirmed before processing
                </p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  2-4 days island-wide shipping
                </p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Returns</h3>
                <p className="text-sm text-muted-foreground">
                  7-day return policy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Terms */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. About Our Service</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p>
                    Snap Styles is a fashion retail business operating primarily through WhatsApp-based ordering. 
                    Our website showcases products, while actual orders and customer communication happen via WhatsApp.
                  </p>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Our Services Include:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Product catalog and pricing information</li>
                      <li>WhatsApp-based ordering and customer service</li>
                      <li>Product delivery across Sri Lanka</li>
                      <li>Return and exchange services</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Ordering Process</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">How Orders Work</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                      <li>Browse products on our website or contact us on WhatsApp</li>
                      <li>Send your order details via WhatsApp (product, size, color, quantity)</li>
                      <li>We confirm availability, pricing, and delivery details</li>
                      <li>Payment is arranged (bank transfer, mobile payment, or COD)</li>
                      <li>Order is processed and shipped with tracking information</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Order Confirmation</h3>
                    <p className="text-muted-foreground">
                      Orders are only confirmed once we respond to your WhatsApp message with confirmation. 
                      Adding items to the website cart does not constitute an order.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Pricing and Payment</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Pricing</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>All prices are in Sri Lankan Rupees (LKR)</li>
                      <li>Prices include VAT where applicable</li>
                      <li>Bulk discounts available for 3+ items (contact via WhatsApp)</li>
                      <li>Prices may change without notice, but confirmed orders honor original price</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Payment Methods</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Bank transfer (preferred)</li>
                      <li>Mobile payments (eZ Cash, mCash, etc.)</li>
                      <li>Cash on Delivery (COD) - limited areas</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Payment Terms</h3>
                    <p className="text-muted-foreground">
                      Payment must be completed before shipping except for approved COD orders. 
                      Orders not paid within 48 hours may be cancelled.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Shipping and Delivery</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Areas and Times</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Island-wide delivery across Sri Lanka</li>
                      <li>Standard delivery: 2-4 business days</li>
                      <li>Colombo express: Same-day or next-day (additional charge)</li>
                      <li>Free shipping for orders over Rs 5,000</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Responsibility</h3>
                    <p className="text-muted-foreground">
                      We work with reliable courier services, but delivery delays due to weather, 
                      address issues, or courier problems are beyond our control. We'll keep you 
                      updated via WhatsApp throughout the process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Returns and Exchanges</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Return Policy</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>7-day return policy from delivery date</li>
                      <li>Items must be unworn with original tags</li>
                      <li>Original packaging required</li>
                      <li>Contact us via WhatsApp to initiate returns</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Exchange Policy</h3>
                    <p className="text-muted-foreground">
                      Size exchanges are available within 7 days, subject to stock availability. 
                      Color exchanges may incur additional charges if there's a price difference.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Non-Returnable Items</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Worn or washed items</li>
                      <li>Items without tags</li>
                      <li>Custom-made or personalized items</li>
                      <li>Undergarments and intimates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Product Information</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Product Descriptions</h3>
                    <p className="text-muted-foreground">
                      We strive for accurate product descriptions and images. However, slight variations 
                      in color, fit, or material may occur. If you receive a product that significantly 
                      differs from our description, contact us immediately.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Stock Availability</h3>
                    <p className="text-muted-foreground">
                      Product availability is confirmed when you place an order via WhatsApp. 
                      Website display does not guarantee stock availability.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Customer Responsibilities</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Accurate Information</p>
                      <p className="text-sm text-muted-foreground">Provide correct delivery address and contact details</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Timely Communication</p>
                      <p className="text-sm text-muted-foreground">Respond to our WhatsApp messages promptly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Payment Completion</p>
                      <p className="text-sm text-muted-foreground">Complete payment within agreed timeframe</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Product Care</p>
                      <p className="text-sm text-muted-foreground">Handle products according to care instructions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Our liability is limited to the purchase price of the product. We are not responsible for:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Delivery delays caused by courier services or external factors</li>
                  <li>Minor variations in product appearance from website images</li>
                  <li>Damage occurring after delivery due to mishandling</li>
                  <li>Consequential or indirect damages</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  We may update these terms from time to time. Significant changes will be communicated 
                  via WhatsApp to active customers. Continued use of our services constitutes acceptance 
                  of updated terms.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contact and Disputes</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    For any issues, questions, or disputes, please contact us first via WhatsApp. 
                    We aim to resolve all issues amicably and quickly.
                  </p>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <p className="mb-4">Need help or have questions about these terms?</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Button variant="whatsapp" className="w-full" asChild>
                        <a
                          href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20have%20a%20question%20about%20your%20terms."
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp Support
                        </a>
                      </Button>
                      
                      <Button variant="outline" className="w-full" asChild>
                        <a href="mailto:support@snapstyles.lk">
                          Email: support@snapstyles.lk
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Acknowledgment */}
          <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">Agreement</h3>
              <p className="text-muted-foreground">
                By placing an order with Snap Styles, you acknowledge that you have read, 
                understood, and agree to these Terms of Service.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;