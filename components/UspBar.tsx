"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const uspItems = [
  {
    title: "Free Exchanges",
    details: "Not the perfect fit? No problem. We offer free and easy exchanges to ensure you're comfortable and confident in your purchase.",
  },
  {
    title: "Discreet Packaging",
    details: "Your privacy is our priority. All orders are shipped in plain, unbranded packaging with no indication of the contents.",
  },
  {
    title: "30-Day Comfort Guarantee",
    details: "Wear it, wash it, live in it. If you're not completely in love with your purchase within 30 days, we'll find you a better fit or provide a full refund.",
  },
];

export function UspBar() {
  return (
    <div className="bg-accent text-accent-foreground sticky top-0 z-40">
      <div className="container mx-auto px-4 py-2 text-sm">
        <div className="flex justify-around items-center">
          {uspItems.map((item) => (
            <Dialog key={item.title}>
              <DialogTrigger asChild>
                <button className="text-center hover:underline">
                  {item.title}
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.title}</DialogTitle>
                </DialogHeader>
                <p>{item.details}</p>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}
