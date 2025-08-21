import Link from "next/link";
import Image from "next/image";
import { Category } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function CategoryTiles() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay()]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const results = await fetch("/api/categories");
        const data = await results.json();
        setCategories(data);
        console.log("Cagtegories has been fetched successfully");
      } catch (error) {
        console.error("Error fetching categories:" + error);
      }
    };
    getCategories();
  }, []);
  return (
    <section
      className="bg-background py-12"
      style={{ backgroundColor: "#FAF9F6", borderColor: "#F5E9DD" }}
    >
      <div ref={emblaRef} className="container flex mx-auto px-4">
        <div  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category: any) => (
            <Link
              href={`/categories/${category.slug?.current}`}
              key={category.title}
              className="group  text-center"
            >
              <div className="relative aspect-square overflow-hidden w-full h-full rounded-2xl">
                {category.image && (
                  <Image
                    src={urlFor(category.image).url()}
                    alt={`Image for ${category.title}`}
                    className="object-fill relative w-full h-full transition-transform duration-300 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 150vw, (max-width: 1200px) 70vw, 44vw"
                  />
                )}
              </div>
              <h3 className="mt-4 text-lg font-serif">{category.title} </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
