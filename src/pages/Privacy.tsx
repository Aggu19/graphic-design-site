import { Shield, Eye, Lock, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Last updated: September 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Quick Summary */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Quick Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Eye className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">What We Collect</h3>
                <p className="text-sm text-muted-foreground">
                  Only information necessary for orders and delivery
                </p>
              </div>
              <div className="text-center">
                <Lock className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">How We Protect It</h3>
                <p className="text-sm text-muted-foreground">
                  Secure systems and encrypted WhatsApp communications
                </p>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Who We Share With</h3>
                <p className="text-sm text-muted-foreground">
                  Only delivery partners and payment processors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Order Information</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Your name and delivery address</li>
                      <li>Phone number for WhatsApp communication</li>
                      <li>Product preferences (size, color, quantity)</li>
                      <li>Payment information (processed securely)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Website Usage</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Pages visited and time spent on site</li>
                      <li>Device type and browser information</li>
                      <li>Shopping cart contents (stored locally on your device)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">WhatsApp Communications</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Messages you send us for orders and inquiries</li>
                      <li>Your WhatsApp profile information (name, profile picture)</li>
                      <li>Delivery confirmations and order updates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Process and fulfill your orders</p>
                      <p className="text-sm text-muted-foreground">Including payment processing and delivery coordination</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Communicate with you via WhatsApp</p>
                      <p className="text-sm text-muted-foreground">Order confirmations, shipping updates, and customer support</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Improve our products and services</p>
                      <p className="text-sm text-muted-foreground">Understanding preferences to offer better products</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Send occasional updates</p>
                      <p className="text-sm text-muted-foreground">New product announcements and special offers (you can opt out anytime)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">We only share your information with:</p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Partners</h3>
                    <p className="text-muted-foreground">
                      Your name, phone number, and delivery address for shipping purposes only.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Payment Processors</h3>
                    <p className="text-muted-foreground">
                      Secure payment information to process your transactions.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Legal Requirements</h3>
                    <p className="text-muted-foreground">
                      When required by law or to protect our rights and safety.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="text-sm font-medium">We never sell your personal information to third parties.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Technical Safeguards</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Encrypted data transmission</li>
                      <li>Secure server infrastructure</li>
                      <li>Regular security updates</li>
                      <li>Limited access controls</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">WhatsApp Security</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>End-to-end encryption</li>
                      <li>Secure message delivery</li>
                      <li>No message storage on our servers</li>
                      <li>Business account security features</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Access & Correction</h3>
                    <p className="text-muted-foreground mb-2">
                      You can request access to or correction of your personal information at any time.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Data Deletion</h3>
                    <p className="text-muted-foreground mb-2">
                      You can request deletion of your personal information, subject to legal requirements.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Communication Preferences</h3>
                    <p className="text-muted-foreground mb-2">
                      You can opt out of promotional messages while still receiving order-related communications.
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    To exercise any of these rights, contact us:
                  </p>
                  <Button variant="whatsapp" asChild>
                    <a
                      href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20have%20a%20privacy%20request."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Us About Privacy
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Cookies & Tracking</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">We use minimal tracking to improve your experience:</p>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">Essential Cookies</h3>
                    <p className="text-muted-foreground">
                      Required for the website to function properly (shopping cart, preferences).
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Analytics</h3>
                    <p className="text-muted-foreground">
                      Anonymous usage statistics to help us improve the website.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. We'll notify you of significant changes 
                  via WhatsApp or by posting an update on our website. Your continued use of our services 
                  after such changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  If you have questions about this privacy policy or how we handle your data:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Button variant="whatsapp" className="w-full" asChild>
                    <a
                      href="https://wa.me/YOUR_WHATSAPP_NUMBER?text=Hi%20Snap%20Styles%2C%20I%20have%20a%20privacy%20question."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp Us
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:privacy@snapstyles.lk">
                      Email: privacy@snapstyles.lk
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;