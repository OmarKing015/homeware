"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import useBasketStore from "@/store/store";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

const FREE_SHIPPING_THRESHOLD = 500; // Example value

export function MiniCart() {
  const { items, getTotalPrice } = useBasketStore();
  const totalPrice = getTotalPrice();
  const shippingProgress = (totalPrice / FREE_SHIPPING_THRESHOLD) * 100;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="relative">
          <ShoppingBasketIcon className="w-6 h-6" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {items.length}
            </span>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-full md:w-96 p-4">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
        </DrawerHeader>
        {items.length > 0 ? (
          <div className="space-y-4">
            {/* Cart Items */}
            {items.map(item => (
              <div key={item.product._id} className="flex gap-4">
                {/* Image placeholder */}
                <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">{(item.product.price ?? 0).toFixed(2)} EGP</p>
              </div>
            ))}
            {/* Free Shipping Progress */}
            <div>
              <p className="text-sm text-center mb-2">
                {totalPrice >= FREE_SHIPPING_THRESHOLD
                  ? "You've got free shipping!"
                  : `You're ${(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)} EGP away from free shipping.`}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${Math.min(shippingProgress, 100)}%` }}></div>
              </div>
            </div>
            {/* Actions */}
            <Button asChild className="w-full"><Link href="/basket">View Full Cart</Link></Button>
            <Button className="w-full" variant="secondary">Proceed to Checkout</Button>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">Your cart is empty.</p>
        )}
      </DrawerContent>
    </Drawer>
  );
}
