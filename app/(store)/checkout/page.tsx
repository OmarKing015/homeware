import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping and Payment */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Shipping Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="first-name">First Name</Label><Input id="first-name" /></div>
                <div><Label htmlFor="last-name">Last Name</Label><Input id="last-name" /></div>
              </div>
              <div><Label htmlFor="address">Address</Label><Input id="address" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label htmlFor="city">City</Label><Input id="city" /></div>
                <div><Label htmlFor="state">State</Label><Input id="state" /></div>
                <div><Label htmlFor="zip">ZIP Code</Label><Input id="zip" /></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
            <CardContent>
              {/* Placeholder for Apple/Google Pay and Credit Card Form */}
              <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Payment integration placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between"><span>Subtotal</span><span>$180.00</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>$0.00</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>$180.00</span></div>
              <Button className="w-full">Place Order</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
