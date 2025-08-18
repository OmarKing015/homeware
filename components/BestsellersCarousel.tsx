"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ProductThumb } from "./ProductThumb"; // Assuming a product card component exists

// Mock data based on the project brief
const mockBestsellers = [
  {
    _id: "1",
    name: "The Everyday Bra",
    price: 60,
    images: [{ asset: { url: "/placeholder-image.jpg" } }],
    slug: { current: "the-everyday-bra" },
  },
  {
    _id: "2",
    name: "The Sculpt Bodysuit",
    price: 85,
    images: [{ asset: { url: "/placeholder-image.jpg" } }],
    slug: { current: "the-sculpt-bodysuit" },
  },
  {
    _id: "3",
    name: "The No-Wire Lounge Bra",
    price: 55,
    images: [{ asset: { url: "/placeholder-image.jpg" } }],
    slug: { current: "the-no-wire-lounge-bra" },
  },
  {
    _id: "4",
    name: "The Maternity Bra",
    price: 65,
    images: [{ asset: { url: "/placeholder-image.jpg" } }],
    slug: { current: "the-maternity-bra" },
  },
  {
    _id: "5",
    name: "The Silk Robe",
    price: 120,
    images: [{ asset: { url: "/placeholder-image.jpg" } }],
    slug: { current: "the-silk-robe" },
  },
];

export function BestsellersCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Bestsellers
        </h2>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {mockBestsellers.map((product) => (
              <div
                className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                key={product._id}
              >
                {/* The ProductThumb component will need to accept this data structure */}
                <ProductThumb product={product as any} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
