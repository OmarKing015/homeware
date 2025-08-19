"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { imageUrl } from "@/lib/imageUrl"

interface Product {
  _id: string
  name: string
  price: number
  description?: string
  images?: any[]
  slug?: { current: string }
  category?: string
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg" style={{ color: "#3A3A3A", opacity: 0.7 }}>
          No products found.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="group bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-105"
          style={{ borderColor: "#E8C7C8" }}
        >
          <Link href={`/product/${product.slug?.current || product._id}`}>
            <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "#F5E9DD" }}>
              {product.images && product.images[0] ? (
                <Image
                  src={imageUrl(product.images[0]).url() || "/placeholder.svg?height=300&width=300&query=homeware product"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image src="/placeholder.svg?height=300&width=300" alt={product.name} fill className="object-cover" />
                </div>
              )}

              {product.category && (
                <Badge className="absolute top-2 left-2 text-xs" style={{ backgroundColor: "#A8B5A2", color: "white" }}>
                  {product.category}
                </Badge>
              )}
            </div>

            <div className="p-4">
              <h3
                className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-opacity-80 transition-colors"
                style={{ color: "#3A3A3A" }}
              >
                {product.name}
              </h3>

              {product.description && (
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "#3A3A3A", opacity: 0.7 }}>
                  {product.description}
                </p>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold" style={{ color: "#3A3A3A" }}>
                  {product.price.toFixed(2)} EGP
                </span>

                <Button
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: "#D77A61",
                    color: "white",
                    border: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#C86B52"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#D77A61"
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
