"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";

export function ProductListing({ initialProducts }: any) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);


  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* <div className="md:sticky top-24 h-fit">
        <Button asChild className="w-full mt-4">
          <Link href="/fit-quiz">Find My Size</Link>
        </Button>
      </div> */}
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
