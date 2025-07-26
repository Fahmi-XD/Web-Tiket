"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [nav, setNav] = useState("bg-transparent");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDynamic = useRef(true);

  const path = usePathname();

  const handleScroll = () => {
    if (isDynamic.current) {
      if (window.scrollY > 100) {
        setNav("bg-white")
      } else {
        setNav("bg-transparent")
      }
    }
  }

  useEffect(() => {
    if (path != "/") {
      isDynamic.current = false;
      setNav("bg-white");
      if (typeof window != "undefined") {
        window.removeEventListener("scroll", handleScroll)
      }
    } else {
      isDynamic.current = true;
    }
    setIsMobileMenuOpen(false);
  }, [path])

  useEffect(() => {
    if (typeof window != "undefined") {
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const commonLinkClasses = `${nav === "bg-white" ? "text-black" : "text-white"} hover:text-blue-600 transition-colors`;
  const mobileLinkClasses = "block px-4 py-2 text-lg"; // Adjusted for mobile menu links

  return (
    <nav className={`backdrop-blur-sm border-b-white/20 border-b fixed w-full transition-all duration-300 top-0 z-50 ${nav}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2 px-4 sm:px-6 lg:px-8">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className={`font-bold text-sm`}>HP</span>
            </div>
            <span className={`text-xl font-bold ${nav == "bg-white" ? "text-black" : "text-white"}`}>Hotel Paradise</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className={commonLinkClasses}>Tentang</a>
            <a href="#rooms" className={commonLinkClasses}>Kamar</a>
            <a href="#facilities" className={commonLinkClasses}>Fasilitas</a>
            <a href="#contact" className={commonLinkClasses}>Kontak</a>
            <Link href="/booking">
              <Button className="bg-blue-600 hover:bg-blue-700">Pesan Sekarang</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className={`${nav === "bg-white" ? "text-black" : "text-white"} focus:outline-none`}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden ${nav === "bg-white" ? "bg-white text-black" : "bg-gray-800 text-white"} py-2`}>
            <a href="#about" className={mobileLinkClasses} onClick={toggleMobileMenu}>Tentang</a>
            <a href="#rooms" className={mobileLinkClasses} onClick={toggleMobileMenu}>Kamar</a>
            <a href="#facilities" className={mobileLinkClasses} onClick={toggleMobileMenu}>Fasilitas</a>
            <a href="#contact" className={mobileLinkClasses} onClick={toggleMobileMenu}>Kontak</a>
            <Link href="/booking">
              <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-2" onClick={toggleMobileMenu}>Pesan Sekarang</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}