import Link from "next/link";
import Image from "next/image";
import { Category } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import { useEffect, useState } from "react";
export function CategoryTiles() {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    const getCategories = async () => {
      try {
        const results = await fetch("/api/categories")
        const data = await results.json()
        setCategories(data)
        console.log("Cagtegories has been fetched successfully")
      } catch (error) {
        console.error("Error fetching categories:" + error)
      }
    }
    getCategories()
  }, [])
  return (
    <section className="bg-background py-12"    style={{ backgroundColor: "#FAF9F6", borderColor: "#F5E9DD" }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category: any) => (
            <Link href={`/categories/${category.slug?.current}`} key={category.title} className="group block text-center">
              <div className="relative overflow-hidden w-full h-full rounded-2xl">
              <Image key={category.title}
                  src={imageUrl(category.image).url() || "/placeholder.svg?height=300&width=300&query=homeware product"}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className="mt-4 text-lg font-serif">{category.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
