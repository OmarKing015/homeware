"use client";
import { useState, useEffect } from "react";
import useBasketStore from "@/store/store";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";
import { Product } from "@/sanity.types";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface SetState {
  lingerie?: Product[];
  pajamas?: Product[];
}

interface ApiResponse {
  products: Product[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export function SetComposer() {
  const [set, setSet] = useState<SetState>({});
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [lingerieProducts, setLingerieProducts] = useState<Product[]>([]);
  const [pajamasProducts, setPajamasProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<{
    lingerie: boolean;
    pajamas: boolean;
  }>({
    lingerie: false,
    pajamas: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [currentSetType, setCurrentSetType] = useState<"lingerie" | "pajamas">(
    "lingerie"
  );

  // Pagination states
  const [lingeriePage, setLingeriePage] = useState(1);
  const [pajamasPage, setPajamasPage] = useState(1);
  const [lingerieTotalPages, setLingerieTotalPages] = useState(1);
  const [pajamasTotalPages, setPajamasTotalPages] = useState(1);

  const itemsPerPage = 6;
  const addItemToBasket = useBasketStore((state) => state.addItem);

  // Fetch products from API
  const fetchProducts = async (
    type: "lingerie" | "pajamas",
    page: number = 1
  ) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    setError(null);

    try {
      const response = await fetch(
        `/api/products?category=${type}&page=${page}&limit=${itemsPerPage}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} products`);
      }

      const data: ApiResponse = await response.json();

      if (type === "lingerie") {
        setLingerieProducts(data.products);
        setLingerieTotalPages(data.totalPages);
      } else {
        setPajamasProducts(data.products);
        setPajamasTotalPages(data.totalPages);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Load initial data
  useEffect(() => {
    fetchProducts("lingerie", 1);
    fetchProducts("pajamas", 1);
  }, []);

  // Handle pagination
  const handlePageChange = (type: "lingerie" | "pajamas", newPage: number) => {
    if (type === "lingerie") {
      setLingeriePage(newPage);
      fetchProducts("lingerie", newPage);
    } else {
      setPajamasPage(newPage);
      fetchProducts("pajamas", newPage);
    }
  };

  const addToSet = (item: Product, type: "lingerie" | "pajamas") => {
    setSet((prevSet) => {
      const currentItems = prevSet[type] || [];
      const isAlreadySelected = currentItems.some((p) => p._id === item._id);

      if (isAlreadySelected) {
        // Remove item if already selected
        return {
          ...prevSet,
          [type]: currentItems.filter((p) => p._id !== item._id),
        };
      } else {
        // Add item to set
        return {
          ...prevSet,
          [type]: [...currentItems, item],
        };
      }
    });

    setCurrentSetType(type);

    // Suggestion logic
    const setItems = set[type] || [];
    if (type === "lingerie" && setItems.length >= 1) {
      setSuggestion(
        "Perfect! Add more pieces to complete your lingerie collection."
      );
    } else if (type === "pajamas" && setItems.length >= 1) {
      setSuggestion("Great choice! Add more items for the perfect pajama set.");
    } else {
      setSuggestion(null);
    }
  };

  const addSetToCart = () => {
    const allSetItems = [...(set.lingerie || []), ...(set.pajamas || [])];

    allSetItems.forEach((product) => {
      if (product) {
        // Get the first image URL if available
        const imageUrl = product.images?.[0]?.asset?._ref
          ? `https://cdn.sanity.io/images/your-project-id/production/${product.images[0].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png")}`
          : "";

        addItemToBasket(
          {
            ...product,
            _id: `${product._id}_${Math.random().toString(36).substring(2, 15)}`,
            images: product.images, // Use the original images array
          },
          product.sizes?.[0]?.size || "M", // Use first available size or default to M
          1 // quantity
        );
      }
    });

    const totalItems = allSetItems.length;
    alert(
      `Your complete set with ${totalItems} items has been added to cart! 💖`
    );
  };

  const isSetComplete =
    (set.lingerie?.length || 0) + (set.pajamas?.length || 0) > 0;

  const renderPagination = (
    currentPage: number,
    totalPages: number,
    type: "lingerie" | "pajamas"
  ) => (
    <div className="flex items-center justify-between mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(type, currentPage - 1)}
        disabled={currentPage === 1 || loading[type]}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(type, currentPage + 1)}
        disabled={currentPage === totalPages || loading[type]}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const renderProductList = (
    products: Product[],
    categoryType: "lingerie" | "pajamas"
  ) => {
    if (loading[categoryType]) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading products...</span>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No products found for this category.
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {products.map((product) => {
          const isSelected =
            set[categoryType]?.some((p) => p._id === product._id) || false;
          const imageUrl = product.images?.[0]?.asset?._ref
            ? `https://cdn.sanity.io/images/your-project-id/production/${product.images[0].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png")}`
            : "";

          return (
            <Button
              key={product._id}
              variant={isSelected ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => addToSet(product, categoryType)}
            >
              <div className="flex items-center space-x-3">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={product.name || "Product"}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                )}
                <div>
                  <div className="font-medium">{product.name}</div>
                  {product.price && (
                    <div className="text-sm text-muted-foreground">
                      ${product.price}
                    </div>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Sizes: {product.sizes.map((s) => s.size).join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    );
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Set Preview Canvas */}
      <div className="lg:col-span-2 p-6 bg-secondary rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Your Selected Items
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lingerie Section */}
          <div>
            <h4 className="font-medium mb-3 text-primary">
              Lingerie ({set.lingerie?.length || 0})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {set.lingerie && set.lingerie.length > 0 ? (
                set.lingerie.map((item) => {
                  const imageUrl = item.images?.[0]?.asset?._ref
                    ? `https://cdn.sanity.io/images/your-project-id/production/${item.images[0].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png")}`
                    : "";
                  return (
                    <Card key={item._id} className="p-2">
                      <CardContent className="p-2 text-center">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.name || "Lingerie"}
                            width={80}
                            height={80}
                            className="rounded object-cover mx-auto"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-muted rounded mx-auto flex items-center justify-center">
                            <span className="text-xs">No Image</span>
                          </div>
                        )}
                        <p className="text-xs mt-1 font-medium truncate">
                          {item.name}
                        </p>
                        {item.price && (
                          <p className="text-xs text-muted-foreground">
                            ${item.price}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  <p>No lingerie selected</p>
                </div>
              )}
            </div>
          </div>

          {/* Pajamas Section */}
          <div>
            <h4 className="font-medium mb-3 text-primary">
              Pajamas ({set.pajamas?.length || 0})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {set.pajamas && set.pajamas.length > 0 ? (
                set.pajamas.map((item) => {
                  const imageUrl = item.images?.[0]?.asset?._ref
                    ? `https://cdn.sanity.io/images/your-project-id/production/${item.images[0].asset._ref.replace("image-", "").replace("-jpg", ".jpg").replace("-png", ".png")}`
                    : "";
                  return (
                    <Card key={item._id} className="p-2">
                      <CardContent className="p-2 text-center">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.name || "Pajamas"}
                            width={80}
                            height={80}
                            className="rounded object-cover mx-auto"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-muted rounded mx-auto flex items-center justify-center">
                            <span className="text-xs">No Image</span>
                          </div>
                        )}
                        <p className="text-xs mt-1 font-medium truncate">
                          {item.name}
                        </p>
                        {item.price && (
                          <p className="text-xs text-muted-foreground">
                            ${item.price}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  <p>No pajamas selected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Selector */}
      <div>
        <Tabs defaultValue="lingerie">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lingerie">Lingerie</TabsTrigger>
            <TabsTrigger value="pajamas">Pajamas</TabsTrigger>
          </TabsList>

          <TabsContent value="lingerie" className="space-y-4">
            {renderProductList(lingerieProducts, "lingerie")}
            {renderPagination(lingeriePage, lingerieTotalPages, "lingerie")}
          </TabsContent>

          <TabsContent value="pajamas" className="space-y-4">
            {renderProductList(pajamasProducts, "pajamas")}
            {renderPagination(pajamasPage, pajamasTotalPages, "pajamas")}
          </TabsContent>
        </Tabs>

        {suggestion && (
          <div className="text-sm text-primary p-3 bg-primary/10 rounded-lg my-4 border border-primary/20">
            💡 {suggestion}
          </div>
        )}

        <Button
          className="w-full mt-4"
          disabled={!isSetComplete}
          onClick={addSetToCart}
        >
          {isSetComplete
            ? `Add Complete ${currentSetType === "lingerie" ? "Lingerie" : "Pajama"} Set to Cart`
            : "Complete your set to add to cart"}
        </Button>
      </div>
    </div>
  );
}
