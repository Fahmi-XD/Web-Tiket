"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, User, Phone, Mail, Copy, Home } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { id } from "date-fns/locale"

export default function BookingSuccessPage() {
  const [bookingData, setBookingData] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("currentBooking")
    if (data) {
      setBookingData(JSON.parse(data))
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const copyBookingCode = () => {
    if (bookingData?.bookingCode) {
      navigator.clipboard.writeText(bookingData.bookingCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Data booking tidak ditemukan</p>
            <Link href="/" className="block mt-4">
              <Button className="w-full">Kembali ke Beranda</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const checkin = new Date(bookingData.checkin)
  const checkout = new Date(bookingData.checkout)
  const expiryDate = new Date(bookingData.expiryDate)

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Hotel Paradise</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h2 className="text-xl font-semibold text-green-900">Booking Berhasil!</h2>
                <p className="text-green-700">Pemesanan kamar Anda telah dikonfirmasi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Code */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Kode Booking Anda</CardTitle>
            <CardDescription>Simpan kode ini untuk check-in di hotel</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2 tracking-wider">{bookingData.bookingCode}</div>
              <Button variant="outline" size="sm" onClick={copyBookingCode} className="gap-2 bg-transparent">
                <Copy className="h-4 w-4" />
                {copied ? "Tersalin!" : "Salin Kode"}
              </Button>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <p className="text-amber-800 font-medium">Berlaku hingga:</p>
              <p className="text-amber-900 text-lg font-semibold">
                {format(expiryDate, "dd MMMM yyyy, HH:mm", { locale: id })} WIB
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detail Pemesanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Informasi Kamar</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Kamar:</strong> {bookingData.roomName}
                  </p>
                  <p>
                    <strong>Check-in:</strong> {format(checkin, "dd MMMM yyyy", { locale: id })}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {format(checkout, "dd MMMM yyyy", { locale: id })}
                  </p>
                  <p>
                    <strong>Durasi:</strong> {bookingData.nights} malam
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Data Tamu</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{bookingData.guestData.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{bookingData.guestData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{bookingData.guestData.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Pembayaran:</span>
              <span className="text-xl font-bold text-blue-600">{formatPrice(bookingData.totalPrice)}</span>
            </div>

            <Badge variant="secondary" className="w-fit">
              Status: {bookingData.status}
            </Badge>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Petunjuk Check-in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <p className="text-sm">Datang ke hotel pada tanggal check-in yang telah ditentukan</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <p className="text-sm">
                Tunjukkan kode booking <strong>{bookingData.bookingCode}</strong> kepada resepsionis
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <p className="text-sm">
                Lakukan pembayaran sebesar <strong>{formatPrice(bookingData.totalPrice)}</strong> di hotel
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <span className="text-blue-600 font-bold text-sm">4</span>
              </div>
              <p className="text-sm">Nikmati menginap Anda di Hotel Paradise!</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Home className="h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Button onClick={() => window.print()} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Cetak Konfirmasi
          </Button>
        </div>

        {/* Contact Info */}
        <Card className="mt-6 bg-gray-50">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-2">Butuh Bantuan?</h4>
            <p className="text-sm text-gray-600 mb-2">Hubungi customer service kami jika ada pertanyaan:</p>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Telepon:</strong> (021) 1234-5678
              </p>
              <p>
                <strong>Email:</strong> info@hotelparadise.com
              </p>
              <p>
                <strong>WhatsApp:</strong> +62 812-3456-7890
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
