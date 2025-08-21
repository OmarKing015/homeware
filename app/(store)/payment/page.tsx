"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CreditCard,
  ShoppingCart,
  User,
  MapPin,
  Truck,
  Heart,
  Lock,
  Shield,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/context";
import useBasketStore from "@/store/store";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "EG",
    postalCode: "",
  });

  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    shippingAddress: {
      street: "",
      city: "",
      country: "EG",
      postalCode: "",
    },
    items: [] as CartItem[],
    totalAmount: 0,
    paymentStatus: "pending" as const,
    paymentMethod: "paymob" as "paymob" | "cod",
    orderStatus: "pending" as const,
    paymobOrderId: "",
    paymobTransactionId: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const groupedItems = useBasketStore((state) => state.getGroupedItems());

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal;
  const { assetId } = useAppContext();
  const { clearBasket } = useBasketStore();

  useEffect(() => {
    // Get cart data from sessionStorage
    const storedItems = sessionStorage.getItem("checkoutItems");
    const storedTotal = sessionStorage.getItem("checkoutTotal");

    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }

    if (storedTotal) {
      console.log("Stored total:", storedTotal);
    }
  }, []);

  useEffect(() => {
    // Update order details whenever form data or cart items change
    setOrderDetails((prev) => ({
      ...prev,
      customerEmail: formData.email,
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      customerPhone: formData.phone,
      shippingAddress: {
        street: formData.address,
        city: formData.city,
        country: "Egypt",
        postalCode: formData.postalCode,
      },
      items: cartItems,
      totalAmount: total,
      paymentMethod: "paymob" as "paymob" | "cod",
      updatedAt: new Date().toISOString(),
    }));
    console.log(cartItems)
    console.log(groupedItems)
  }, [formData, cartItems, total, paymentMethod]);

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({
       ...prev, [field]: value })
    );
   
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Cart Items: "+cartItems)
      console.log("GroupedItems :"+groupedItems)
      
      // Handle Card Payment with Paymob
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "EGP",
          items: cartItems.map((item) => ({
          name:item.name,
            product: {
            
            _key:item.id,
            _ref:item.id,
            _type:"reference" as const
          },
          quantity : item.quantity,
          price: Math.round(item.price * 100),
          size:item.size
            // size: item.product?.size,
          })),
          customer: formData,
          assetId: assetId,
          groupedItems:groupedItems,
        }),
      });
      console.log("Total amount : " + total + "items :" + cartItems);
      const data = await response.json();
      console.log(cartItems)

      if (data.success && data.checkoutUrl) {
        // Redirect to Unified Checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || "Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Order processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen py-4 sm:py-8 px-4 sm:px-6 lg:px-8"
      style={{ 
        background: "linear-gradient(135deg, #ffeef8 0%, #fff0f7 50%, #fdf2f8 100%)"
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent mb-2">
            Complete Your Order
          </h1>
          <p className="text-gray-600 text-sm sm:text-base flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-500" />
            Secure & elegant checkout experience
            <Heart className="h-4 w-4 text-pink-500 fill-current" />
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Payment Form - Takes more space on larger screens */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Customer Information */}
            <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-pink-100 rounded-full">
                    <User className="h-4 w-4 text-pink-600" />
                  </div>
                  <span className="text-lg sm:text-xl">Personal Details</span>
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Let us know how to reach you ✨
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                    placeholder="+20 123 456 7890"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-pink-100 rounded-full">
                    <MapPin className="h-4 w-4 text-pink-600" />
                  </div>
                  <span className="text-lg sm:text-xl">Delivery Address</span>
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Where should we send your beautiful items? 💕
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 font-medium">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                    placeholder="123 Beautiful Street"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-700 font-medium">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                      placeholder="Cairo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-gray-700 font-medium">
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-300"
                      placeholder="12345"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
                <CardTitle className="text-lg sm:text-xl text-gray-800">
                  Secure Payment
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Your payment is protected and encrypted 🔒
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-4 sm:p-6 border-2 border-pink-200 rounded-xl bg-gradient-to-r from-pink-25 to-rose-25 hover:border-pink-300 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-base sm:text-lg">
                        Credit/Debit Card & e-Wallet
                      </p>
                      <p className="text-sm text-gray-600">
                        Secure payment powered by Paymob • SSL Encrypted
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                          <Lock className="h-3 w-3 mr-1" />
                          Secure
                        </Badge>
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                          <Shield className="h-3 w-3 mr-1" />
                          Protected
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Responsive sidebar */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-4">
              <CardHeader className="pb-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-pink-100 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-pink-600" />
                  </div>
                  <span className="text-lg sm:text-xl">Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-pink-25 rounded-lg border border-pink-100">
                      {/* <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-pink-200"
                      /> */} 
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                          <span>Qty: {item.quantity}</span>
                          <span className="font-semibold mx-auto">Size: {item.size}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          {item.price.toFixed(2)} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-pink-200" />

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span className="text-sm sm:text-base">Subtotal</span>
                    <span className="font-medium text-sm sm:text-base">{subtotal.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between text-red-600 text-sm">
                    <span> Shipping</span>
                    <span className="font-medium">90 EGP Upon delivery</span>
                  </div>

                  <Separator className="bg-pink-200" />
                  <div className="flex justify-between font-bold text-lg sm:text-xl text-gray-900">
                    <span>Total</span>
                    <span className="text-pink-600">{total.toFixed(2)} EGP</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                      Complete Purchase
                      <Heart className="h-4 w-4 fill-current" />
                    </div>
                  )}
                </Button>
              </CardFooter>
              <Card className="border-pink-100 bg-gradient-to-r from-pink-25 to-rose-25">
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-pink-100 text-pink-700 hover:bg-pink-200"
                  >
                    <Shield className="h-3 w-3" />
                    SSL Protected
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-pink-100 text-pink-700 hover:bg-pink-200"
                  >
                    <Lock className="h-3 w-3" />
                    Secure Checkout
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-pink-100 text-pink-700 hover:bg-pink-200"
                  >
                    <Heart className="h-3 w-3 fill-current" />
                    Trusted Store
                  </Badge>
                </div>
              </CardContent>
            </Card>
            </Card>

            {/* Trust Badges */}
            
          </div>
        </div>
      </div>
    </div>
  );
}