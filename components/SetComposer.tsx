"use client";

import { useState } from "react";
import useBasketStore from "@/store/store";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Image from "next/image";

// Mock data
const mockProducts = {
  bras: [
    { id: "b1", name: "Everyday Lace Bra", image: "/placeholder-image.jpg" },
    { id: "b2", name: "No-Wire Freedom Bra", image: "/placeholder-image.jpg" },
  ],
  briefs: [
    { id: "p1", name: "Matching Lace Brief", image: "/placeholder-image.jpg" },
    { id: "p2", name: "Seamless Brief", image: "/placeholder-image.jpg" },
  ],
  robes: [
    { id: "r1", name: "Silk Kimono Robe", image: "/placeholder-image.jpg" },
    { id: "r2", name: "Cotton Waffle Robe", image: "/placeholder-image.jpg" },
  ],
};

type Product = { id: string; name: string; image: string };

export function SetComposer() {
  const [set, setSet] = useState<{ bra: Product | null; brief: Product | null; robe: Product | null }>({
    bra: null,
    brief: null,
    robe: null,
  });
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const addItemToBasket = useBasketStore((state) => state.addItem);

  const addToSet = (item: Product, type: "bra" | "brief" | "robe") => {
    setSet((prevSet) => ({ ...prevSet, [type]: item }));

    // Suggestion logic
    if (type === 'bra' && item.name.includes("Lace")) {
      setSuggestion("Try the 'Matching Lace Brief' for a perfect pair!");
    } else {
      setSuggestion(null);
    }
  };

  const addSetToCart = () => {
    Object.values(set).forEach((product) => {
      if (product) {
        // Important: pass each product individually with its own ID
        addItemToBasket(
          {
            ...product,
            _id: Math.random().toString(36).substring(2, 15),
            _type: "product",
            _createdAt: "",
            _updatedAt: "",
            _rev: ""
          }, // spread to avoid reference issues
          "M",            // size or variant
          1               // quantity should be 1, not 0
        );
      }
    });
    alert("Your full set has been added, piece by piece 😉");
  };
  

  const isSetComplete = set.bra && set.brief && set.robe;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Canvas */}
      <div className="lg:col-span-2 p-6 bg-secondary rounded-2xl grid grid-cols-3 gap-4 items-center justify-items-center">
        {Object.keys(set).map((type) => (
          <Card key={type} className="w-full h-64 flex items-center justify-center">
            <CardContent className="p-2 text-center">
              {set[type as keyof typeof set] ? (
                <Image src={set[type as keyof typeof set]!.image} alt={set[type as keyof typeof set]!.name} width={150} height={150} />
              ) : (
                <p className="text-muted-foreground">Select a {type}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Product Selector */}
      <div>
        <Tabs defaultValue="bras">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bras">Bras</TabsTrigger>
            <TabsTrigger value="briefs">Briefs</TabsTrigger>
            <TabsTrigger value="robes">Robes</TabsTrigger>
          </TabsList>
          <TabsContent value="bras">
            {mockProducts.bras.map(p => <Button key={p.id} variant="ghost" className="w-full justify-start" onClick={() => addToSet(p, 'bra')}>{p.name}</Button>)}
          </TabsContent>
          <TabsContent value="briefs">
             {mockProducts.briefs.map(p => <Button key={p.id} variant="ghost" className="w-full justify-start" onClick={() => addToSet(p, 'brief')}>{p.name}</Button>)}
          </TabsContent>
          <TabsContent value="robes">
             {mockProducts.robes.map(p => <Button key={p.id} variant="ghost" className="w-full justify-start" onClick={() => addToSet(p, 'robe')}>{p.name}</Button>)}
          </TabsContent>
        </Tabs>
        {suggestion && <p className="text-sm text-primary p-2 bg-secondary rounded-lg my-2">{suggestion}</p>}
        <Button className="w-full mt-4" disabled={!isSetComplete} onClick={addSetToCart}>Add Full Set to Cart</Button>
      </div>
    </div>
  );
}
