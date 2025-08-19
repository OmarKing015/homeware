"use client"
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
