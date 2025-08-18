import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Everyday Soft",
    href: "/categories/everyday-soft",
    imageSrc: "/placeholder-image.jpg", // Replace with actual image path
  },
  {
    name: "Sculpt & Smooth",
    href: "/categories/sculpt-smooth",
    imageSrc: "/placeholder-image.jpg",
  },
  {
    name: "No-Wire Freedom",
    href: "/categories/no-wire-freedom",
    imageSrc: "/placeholder-image.jpg",
  },
  {
    name: "Maternity & Nursing",
    href: "/categories/maternity-nursing",
    imageSrc: "/placeholder-image.jpg",
  },
  {
    name: "Sleep Easy",
    href: "/categories/sleep-easy",
    imageSrc: "/placeholder-image.jpg",
  },
];

export function CategoryTiles() {
  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link href={category.href} key={category.name} className="group block text-center">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={category.imageSrc}
                  alt={category.name}
                  width={400}
                  height={500}
                  className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
              </div>
              <h3 className="mt-4 text-lg font-serif">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
