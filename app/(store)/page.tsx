"use client"
import CustomizationBanner from "@/components/BlackFirdayBanner";
import ProductsView from "@/components/ProductsView";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/sanity.types";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { SetStateAction, useEffect, useState } from "react";

import { BestsellersCarousel } from "@/components/BestsellersCarousel";
import { CategoryTiles } from "@/components/CategoryTiles";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategoryTiles />
      <BestsellersCarousel />
    </div>
  );
}
