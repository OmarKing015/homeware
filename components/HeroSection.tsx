import Link from "next/link";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] bg-cover bg-center text-white flex items-center justify-center">
      {/* Background image or video will go here */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Comfort Meets Confidence
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover lingerie that feels as good as it looks.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/fit-quiz">Find My Fit</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/categories/bestsellers">Shop Bestsellers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
