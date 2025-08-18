import { ProductListing } from "@/components/ProductListing"
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory"
import { ArrowLeft, Tag } from "lucide-react"
import Link from "next/link"

async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const products = await getProductsByCategory(slug)

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <Link href="/#categories" className="hover:text-primary transition-colors duration-200">
              Categories
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{categoryName}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-secondary p-2 rounded-lg">
                <Tag className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{categoryName}</h1>
                <p className="text-muted-foreground mt-1">
                  {products.length} {products.length === 1 ? "product" : "products"}
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to All Categories</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <ProductListing initialProducts={products} />
      </div>
    </div>
  )
}

export default CategoryPage
