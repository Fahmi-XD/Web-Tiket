"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Waves,
  Dumbbell,
  Calendar,
  Users,
  Shield,
  Clock,
  Award,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Wifi,
    title: "WiFi Gratis",
    description: "Internet berkecepatan tinggi di seluruh area hotel",
  },
  {
    icon: Car,
    title: "Parkir Gratis",
    description: "Area parkir luas dan aman untuk kendaraan Anda",
  },
  {
    icon: Utensils,
    title: "Restaurant",
    description: "Restoran dengan menu lokal dan internasional",
  },
  {
    icon: Waves,
    title: "Kolam Renang",
    description: "Kolam renang outdoor dengan pemandangan indah",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "Gym lengkap dengan peralatan modern",
  },
  {
    icon: Coffee,
    title: "Room Service",
    description: "Layanan kamar 24 jam untuk kenyamanan Anda",
  },
]

const roomTypes = [
  {
    name: "Standard Room",
    price: "350.000",
    image: "https://i.pinimg.com/1200x/12/35/94/123594d4abbea3bf01a4fce1930b7a04.jpg",
    features: ["WiFi Gratis", "AC", "TV LED", "Kamar Mandi Pribadi"],
  },
  {
    name: "Superior Room",
    price: "550.000",
    image: "https://i.pinimg.com/736x/e6/30/db/e630db9e931df9ea09a6090cf5dbfa89.jpg",
    features: ["WiFi Gratis", "AC", "TV LED", "Mini Bar", "Balkon"],
  },
  {
    name: "Deluxe Room",
    price: "750.000",
    image: "https://i.pinimg.com/736x/4b/05/f3/4b05f340ab095d7e0f548d38d44a21c3.jpg",
    features: ["WiFi Gratis", "AC", "TV LED", "Mini Bar", "City View", "Coffee Maker"],
  },
  {
    name: "Family Suite",
    price: "1.200.000",
    image: "https://i.pinimg.com/736x/42/fc/9a/42fc9a8383520d0c0ef509074c493623.jpg",
    features: ["WiFi Gratis", "AC", "TV LED", "Ruang Tamu", "2 Kamar Tidur", "Dapur Kecil"],
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Jakarta",
    rating: 5,
    comment: "Pelayanan yang luar biasa! Staff sangat ramah dan kamar sangat bersih. Pasti akan kembali lagi.",
  },
  {
    name: "Michael Chen",
    location: "Surabaya",
    rating: 5,
    comment: "Lokasi strategis dan fasilitas lengkap. Breakfast buffet-nya juga sangat enak dan beragam.",
  },
  {
    name: "Rina Sari",
    location: "Bandung",
    rating: 5,
    comment: "Hotel yang sempurna untuk liburan keluarga. Anak-anak senang dengan kolam renangnya.",
  },
]

const stats = [
  { number: "500+", label: "Tamu Puas", icon: Heart },
  { number: "50+", label: "Kamar Tersedia", icon: Users },
  { number: "24/7", label: "Layanan", icon: Clock },
  { number: "4.9", label: "Rating", icon: Star },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.pinimg.com/1200x/fb/67/cc/fb67cc51c1b113bb396db347368f6652.jpg"
            alt="Hotel Paradise"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <Badge className="mb-4 bg-blue-600/90 text-white border-0">⭐ Hotel Terbaik di Kota</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Selamat Datang di
            <span className="block text-blue-400">Hotel Paradise</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Nikmati pengalaman menginap yang tak terlupakan dengan pelayanan terbaik, fasilitas lengkap, dan kenyamanan
            maksimal di jantung kota.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Pesan Kamar Sekarang
              </Button>
            </Link>
            <Link href="/check-booking">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Cek Status Booking
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-blue-200" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-600 border-0">Tentang Kami</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Pengalaman Menginap yang Tak Terlupakan</h2>
              <p className="text-lg text-gray-600 mb-6">
                Hotel Paradise telah melayani tamu dari seluruh dunia selama lebih dari 10 tahun. Kami berkomitmen
                memberikan pelayanan terbaik dengan fasilitas modern dan kenyamanan yang maksimal.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Protokol kesehatan ketat</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Penghargaan hotel terbaik 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Layanan 24 jam setiap hari</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://i.pinimg.com/1200x/80/e9/27/80e9279d123d9b280146456603b1ebcd.jpg"
                alt="Hotel Lobby"
                width={500}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 border-0">Pilihan Kamar</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kamar yang Sempurna untuk Setiap Kebutuhan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dari kamar standar hingga suite mewah, kami menyediakan berbagai pilihan akomodasi yang sesuai dengan
              budget dan preferensi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roomTypes.map((room, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{room.name}</CardTitle>
                  <div className="text-2xl font-bold text-blue-600">
                    Rp {room.price}
                    <span className="text-sm text-gray-500 font-normal">/malam</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Lihat Semua Kamar & Pesan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 border-0">Fasilitas</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fasilitas Lengkap untuk Kenyamanan Anda</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nikmati berbagai fasilitas premium yang dirancang untuk memberikan pengalaman menginap yang tak
              terlupakan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 border-0">Testimoni</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Apa Kata Tamu Kami</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kepuasan tamu adalah prioritas utama kami. Berikut adalah beberapa testimoni dari tamu yang telah menginap
              di Hotel Paradise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.comment}&quot;</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-black">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Siap untuk Pengalaman Menginap yang Luar Biasa?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Pesan kamar Anda sekarang dan nikmati pelayanan terbaik di Hotel Paradise. Dapatkan harga terbaik dengan
            booking langsung melalui website kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Pesan Sekarang
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Phone className="mr-2 h-5 w-5" />
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 border-0">Kontak</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tim customer service kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami jika ada pertanyaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Telepon</h3>
                <p className="text-gray-600">(021) 1234-5678</p>
                <p className="text-gray-600">+62 812-3456-7890</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@hotelparadise.com</p>
                <p className="text-gray-600">reservation@hotelparadise.com</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Alamat</h3>
                <p className="text-gray-600">Jl. Sudirman No. 123</p>
                <p className="text-gray-600">Jakarta Pusat, 10220</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
