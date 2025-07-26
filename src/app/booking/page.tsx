"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Users, Bed, Wifi, Car, Coffee, Tv, Wind, ArrowLeft } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import Image from "next/image"
import Link from "next/link"

// Sample room data
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

const facilityIcons = {
  WiFi: Wifi,
  AC: Wind,
  TV: Tv,
  "Coffee Maker": Coffee,
  Parking: Car,
}

export default function HomePage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [availableRooms, setAvailableRooms] = useState(rooms)

  const checkAvailability = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Silakan pilih tanggal check-in dan check-out")
      return
    }

    // Simulate checking availability - in real app, this would query the database
    // For demo purposes, we'll show all rooms as available
    setAvailableRooms(rooms)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center w-full gap-4 flex-col lg:flex-row">
              <Link href="/" className="cursor-pointer">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Halaman awal
                </Button>
              </Link>
              <div className="w-auto">
                <h1 className="text-2xl font-bold text-gray-900">Hotel Paradise</h1>
                <p className="text-gray-600">Temukan kenyamanan terbaik untuk menginap Anda</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Pilih Tanggal Menginap</CardTitle>
            <CardDescription>Tentukan tanggal check-in dan check-out untuk melihat ketersediaan kamar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-12 bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd MMM yyyy")} - {format(dateRange.to, "dd MMM yyyy")}
                          </>
                        ) : (
                          format(dateRange.from, "dd MMM yyyy")
                        )
                      ) : (
                        <span>Pilih tanggal check-in dan check-out</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={checkAvailability} size="lg" className="h-12 bg-blue-500 text-white">
                Cek Ketersediaan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Room Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableRooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-lg min-h-0 transition-shadow flex flex-col h-auto">
              <div className="relative h-58 shrink-0">
                <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-blue-600">{room.type}</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{room.name}</CardTitle>
                <CardDescription className="text-sm">{room.description}</CardDescription>
              </CardHeader>
              <CardContent className="h-full flex flex-col space-y-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>Maksimal {room.capacity} tamu</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {room.facilities.map((facility) => {
                    const Icon = facilityIcons[facility as keyof typeof facilityIcons] || Bed
                    return (
                      <div key={facility} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded">
                        <Icon className="h-3 w-3" />
                        <span>{facility}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="flex flex-col min-h-0 mt-auto text-center h-auto items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{formatPrice(room.price)}</p>
                    <p className="text-xs text-gray-500">per malam</p>
                  </div>
                  <Link
                    aria-disabled={true}
                    onClick={(e) => {
                      if (!dateRange?.from || !dateRange?.to) {
                        e.preventDefault()
                      }
                    }}
                    href={`/booking/${room.id}?checkin=${dateRange?.from?.toISOString()}&checkout=${dateRange?.to?.toISOString()}`}
                  >
                    <Button disabled={!dateRange?.from || !dateRange?.to} className="bg-blue-600 hover:bg-blue-700 text-white">
                      Pesan Sekarang
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {availableRooms.length === 0 && dateRange?.from && dateRange?.to && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tidak ada kamar yang tersedia untuk tanggal yang dipilih.</p>
            <p className="text-gray-400">Silakan pilih tanggal lain.</p>
          </div>
        )}
      </div>
    </div>
  )
}
