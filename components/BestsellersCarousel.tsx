"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductThumb from "./ProductThumb"; // Assuming a product card component exists
import { useEffect, useState, useCallback } from "react";
import { getProductByAPArtOFSlug } from "@/sanity/lib/products/getProductByAPartOfSlug";
import { Product } from "@/sanity.types";
import Autoplay from "embla-carousel-autoplay";

export function BestsellersCarousel() {
 const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay()]);
  const [bestsellers, setBestSellers] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await getProductByAPArtOFSlug("bestseller");
        setBestSellers(products);
        console.log("products", products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Bestsellers</h2>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {bestsellers?.map((product) => (
              <div
                className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                key={product._id}
              >
                <ProductThumb product={product as never} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
