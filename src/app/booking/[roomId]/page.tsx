"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { id } from "date-fns/locale"

// Sample room data (in real app, this would come from database)
const rooms = [
  {
    id: 1,
    name: "Deluxe Room",
    type: "Deluxe",
    price: 750000,
    capacity: 2,
    facilities: ["WiFi", "AC", "TV", "Coffee Maker"],
    image: "https://i.pinimg.com/736x/4b/05/f3/4b05f340ab095d7e0f548d38d44a21c3.jpg",
    description: "Kamar mewah dengan pemandangan kota dan fasilitas lengkap",
  },
  {
    id: 2,
    name: "Superior Room",
    type: "Superior",
    price: 550000,
    capacity: 2,
    facilities: ["WiFi", "AC", "TV"],
    image: "https://i.pinimg.com/736x/4b/05/f3/4b05f340ab095d7e0f548d38d44a21c3.jpg",
    description: "Kamar nyaman dengan fasilitas standar berkualitas tinggi",
  },
  {
    id: 3,
    name: "Family Suite",
    type: "Suite",
    price: 1200000,
    capacity: 4,
    facilities: ["WiFi", "AC", "TV", "Coffee Maker", "Parking"],
    image: "https://i.pinimg.com/736x/4b/05/f3/4b05f340ab095d7e0f548d38d44a21c3.jpg",
    description: "Suite keluarga dengan ruang tamu terpisah dan 2 kamar tidur",
  },
  {
    id: 4,
    name: "Standard Room",
    type: "Standard",
    price: 350000,
    capacity: 2,
    facilities: ["WiFi", "AC"],
    image: "https://i.pinimg.com/736x/4b/05/f3/4b05f340ab095d7e0f548d38d44a21c3.jpg",
    description: "Kamar standar yang bersih dan nyaman dengan fasilitas dasar",
  },
]

export default function BookingPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const roomId = Number.parseInt(params.roomId as string)
  const checkinDate = searchParams.get("checkin")
  const checkoutDate = searchParams.get("checkout")

  const [room, setRoom] = useState(rooms.find((r) => r.id === roomId))
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const checkin = checkinDate ? new Date(checkinDate) : null
  const checkout = checkoutDate ? new Date(checkoutDate) : null
  const nights = checkin && checkout ? Math.ceil((checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const totalPrice = room ? room.price * nights : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Silakan lengkapi semua data yang diperlukan")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const bookingCode = `HOTEL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + 2) // 2 days from now

      // In real app, save to database here
      const bookingData = {
        bookingCode,
        roomId: room?.id,
        roomName: room?.name,
        checkin: checkin?.toISOString(),
        checkout: checkout?.toISOString(),
        nights,
        totalPrice,
        guestData: formData,
        expiryDate: expiryDate.toISOString(),
        status: "Booked",
      }

      localStorage.setItem("currentBooking", JSON.stringify(bookingData))
      router.push("/booking/success")
    }, 2000)
  }

  if (!room || !checkin || !checkout) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Data booking tidak valid</p>
            <Link href="/" className="block mt-4">
              <Button className="w-full">Kembali ke Beranda</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 flex-col lg:flex-row">
            <Button variant="ghost" size="sm" className="text-lg" onClick={() => router.back()}>
              <ArrowLeft size="30" className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Konfirmasi Booking</h1>
              <p className="text-gray-600">Lengkapi data diri untuk menyelesaikan pemesanan</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Kamar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-blue-600">{room.type}</Badge>
              </div>

              <div>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{room.description}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>Maksimal {room.capacity} tamu</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {room.facilities.map((facility) => (
                  <Badge key={facility} variant="secondary" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Check-in: {format(checkin, "dd MMMM yyyy", { locale: id })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Check-out: {format(checkout, "dd MMMM yyyy", { locale: id })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{nights} malam</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Harga per malam</span>
                  <span>{formatPrice(room.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Jumlah malam</span>
                  <span>{nights} malam</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Data Tamu</CardTitle>
              <CardDescription>Masukkan data diri untuk pemesanan kamar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Alamat Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Separator />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Ringkasan Pesanan</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>
                      <strong>Kamar:</strong> {room.name}
                    </p>
                    <p>
                      <strong>Tanggal:</strong> {format(checkin, "dd MMM", { locale: id })} -{" "}
                      {format(checkout, "dd MMM yyyy", { locale: id })}
                    </p>
                    <p>
                      <strong>Durasi:</strong> {nights} malam
                    </p>
                    <p>
                      <strong>Total:</strong> {formatPrice(totalPrice)}
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Konfirmasi Booking"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku. Pembayaran dilakukan saat
                  check-in di hotel.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
