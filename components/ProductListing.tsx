"use client";

import { Product } from "@/sanity.types";
import { useState, useEffect } from "react";
import { Filters } from "./Filters";
import ProductGrid from "./ProductGrid";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProductListingProps {
  initialProducts: Product[];
}

export function ProductListing({ initialProducts }: ProductListingProps) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  // In a real app, the filtering logic would be more complex.
  // It would take the filter values from the <Filters /> component
  // and apply them to the initialProducts array.
  // For now, we just display the products.

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:sticky top-24 h-fit">
        <Filters />
        <Button asChild className="w-full mt-4">
          <Link href="/fit-quiz">Find My Size</Link>
        </Button>
      </div>
      <div className="flex-1">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">No products match your filters.</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your selection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
