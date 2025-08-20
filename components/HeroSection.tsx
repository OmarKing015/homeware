import Link from "next/link"
import { Button } from "./ui/button"
import * as hero from "@/public/public/hero.png"
import Image from "next/image"
export function HeroSection() {
  return (
    <section
      className="relative w-full h-[80vh] bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundColor: "#F5E9DD" }}
    >
 <Image src="/public/hero.png"alt="image" fill style={{ objectFit: 'cover' }} />
      <div className="absolute inset-0" 
      style={{ backgroundColor: "rgba(58, 58, 58, 0.5)" }}
      ></div>

      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Comfort Meets Confidence</h1>
        <p className="text-lg md:text-xl mb-8 text-white/90">Discover lingerie that feels as good as it looks.</p>
        <div className="flex justify-center gap-4">
          {/* <Button asChild varient="default" size="lg">
            <Link href="/fit-quiz">Find My Fit</Link>
          </Button> */}
          <Button asChild size="lg" className=" bg-gray-900 animate-pulse" variant="destructive">
            <Link href="/search?query=bestsellers">Shop Bestsellers</Link>
          </Button>
          <Button size="lg" className="bg-white animate-bounce text-black" variant="outline">
            <Link href="/set-composer">Buy a Full package</Link>
          </Button>
        </div>
        
      </div>
    </section>
  )
}
