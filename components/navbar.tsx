"use client"

<<<<<<< HEAD
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { createBrowserClient } from "@/lib/supabase-browser"
import { Menu, X, User, LogIn } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const supabase = createBrowserClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
=======
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Heart } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
>>>>>>> 5bb22b8 (edit ui and api)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

<<<<<<< HEAD
  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/diagnosis", label: "Diagnosis" },
    { href: "/guides", label: "Panduan Kesehatan" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "Tentang Kami" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <span className="text-2xl font-bold text-primary">Sehatica</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            {user ? (
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="mr-2 h-4 w-4" />
                  Masuk
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="sm" onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
=======
  // Simplified navigation links
  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/blog", label: "Blog" },
    { href: "/diagnosis", label: "Diagnosis" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Navigation links */}
          <div className="flex items-center space-x-6">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side: Logo and buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle button */}
            <ThemeToggle />

            {/* Login/Register button */}
            <Link href="/login">
              <Button variant="outline" size="sm">
                Masuk / Daftar
              </Button>
            </Link>

            {/* Logo on the right */}
            <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <span className="text-xl font-bold text-primary">Sehatica</span>
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <Heart className="h-4 w-4 text-primary" />
              </div>
            </Link>
>>>>>>> 5bb22b8 (edit ui and api)
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
<<<<<<< HEAD
            <div className="pt-4 border-t">
              {user ? (
                <Link href="/dashboard" onClick={closeMenu}>
                  <Button className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profil
                  </Button>
                </Link>
              ) : (
                <Link href="/login" onClick={closeMenu}>
                  <Button className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Masuk
                  </Button>
                </Link>
              )}
            </div>
=======
>>>>>>> 5bb22b8 (edit ui and api)
          </div>
        </div>
      )}
    </header>
  )
}

