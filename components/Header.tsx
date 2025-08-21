"use client"
import { ClerkLoaded, Protect, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Form from "next/form"
import { PackageIcon, ShoppingBasketIcon, Search, Menu, X, PenToolIcon, WandSparklesIcon, PenIcon } from "lucide-react"
import useBasketStore from "@/store/store"
import { MiniCart } from "./MiniCart"
import { useState } from "react"
import { Button } from "./ui/button"

function Header() {
  const { user } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))

  return (
    <header
      className="shadow-sm border-b sticky top-0 z-50"
      style={{ backgroundColor: "#FAF9F6", borderColor: "#F5E9DD" }}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold transition-colors duration-200"
            style={{ color: "#D77A61" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A8B5A2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#D77A61")}
          >
            Talia
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <Form action="/search" className="relative">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                  style={{ color: "#A8B5A2" }}
                /> 
                <input
                  type="text"
                  placeholder="Search for beautiful Talia..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent"
                  style={{
                    backgroundColor: "#F5E9DD",
                    borderColor: "#E8C7C8",
                    color: "#3A3A3A",
                  }}
                  onFocus={(e) => {
                    // e.currentTarget.style.ringColor = "#D77A61"
                    e.currentTarget.style.borderColor = "#D77A61"
                  }}
                  name="query"
                />
              </div>
            </Form>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <MiniCart />

         
    
         {user?.publicMetadata.role === "admin" &&     <Button variant="secondary">
                <p
                  className="relative flex items-center space-x-2 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  style={{ backgroundColor: "#3A3A3A", color: "white" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A8B5A2")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3A3A3A")}
                >
                  <Link href="/studio">Admin</Link>
                </p>
              </Button>
          
}
            {/* Orders & Auth */}
            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="flex items-center space-x-2 font-medium py-2 px-3 rounded-lg transition-all duration-200"
                  style={{ color: "#3A3A3A" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D77A61"
                    e.currentTarget.style.backgroundColor = "#F5E9DD"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3A3A3A"
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  <PackageIcon className="w-4 h-4" />
                  <span>Orders</span>
                </Link>
              </SignedIn>

              {user ? (
                <div className="flex items-center space-x-3 pl-4 border-l" style={{ borderColor: "#E8C7C8" }}>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: "#A8B5A2" }}>
                      Welcome back
                    </p>
                    <p className="font-semibold" style={{ color: "#3A3A3A" }}>
                      {user.fullName}!
                    </p>
                  </div>
                  <UserButton />
                </div>
              ) : (
                <Button>
                  <SignInButton mode="modal" />
                </Button>
              )}
            </ClerkLoaded>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-xl font-bold transition-colors duration-200"
            style={{ color: "#D77A61" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A8B5A2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#D77A61")}
          >
            Talia
          </Link>

          <div className="flex items-center space-x-3">
            {/* Basket */}
            <Link
              href="/basket"
              className="relative p-2 transition-colors duration-200"
              style={{ color: "#3A3A3A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D77A61")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3A3A3A")}
            >
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: "#D77A61" }}
                >
                  {itemCount}
                </span>
              )}
              <ShoppingBasketIcon className="w-5 h-5" />
            </Link>

      
       
            {/* Design Control */}
      
            {user?.publicMetadata.role === "admin" &&   <Button variant="secondary">
                <p
                  className="relative flex items-center space-x-2 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                  style={{ backgroundColor: "#3A3A3A", color: "white" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A8B5A2")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3A3A3A")}
                >
                  <Link href="/studio">
                    <PenIcon className="w-5 h-5" />
                  </Link>
                </p>
              </Button>}
           

            <ClerkLoaded>{user ? <UserButton /> : <SignInButton mode="modal" />}</ClerkLoaded>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors duration-200"
              style={{ color: "#3A3A3A" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D77A61")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3A3A3A")}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <Form action="/search" className="relative">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                style={{ color: "#A8B5A2" }}
              />
              <input
                type="text"
                placeholder="Search for beautiful Talia..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:border-transparent"
                style={{
                  backgroundColor: "#F5E9DD",
                  borderColor: "#E8C7C8",
                  color: "#3A3A3A",
                }}
                onFocus={(e) => {
                  // e.currentTarget.style.ringColor = "#D77A61"
                  e.currentTarget.style.borderColor = "#D77A61"
                }}
                name="query"
              />
            </div>
          </Form>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-4" style={{ borderColor: "#E8C7C8" }}>
            <div className="space-y-2">
     
              <ClerkLoaded>
                <SignedIn>
          
                  <Link
                    href="/orders"
                    className="flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200"
                    style={{ color: "#3A3A3A" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#D77A61"
                      e.currentTarget.style.backgroundColor = "#F5E9DD"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#3A3A3A"
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <PackageIcon className="w-5 h-5" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                </SignedIn>
              </ClerkLoaded>

              {user && (
                <div className="py-3 px-4 border-t" style={{ borderColor: "#E8C7C8" }}>
                  <p className="text-xs" style={{ color: "#A8B5A2" }}>
                    Signed in as
                  </p>
                  <p className="font-semibold" style={{ color: "#3A3A3A" }}>
                    {user.fullName}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
