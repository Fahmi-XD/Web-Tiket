"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { id } from "date-fns/locale"

// Sample booking data (in real app, this would come from database)
const sampleBookings = [
  {
    bookingCode: "HOTEL-ABC123",
    roomId: 1,
    roomName: "Deluxe Room",
    checkin: "2025-02-15T00:00:00.000Z",
    checkout: "2025-02-17T00:00:00.000Z",
    nights: 2,
    totalPrice: 1500000,
    guestData: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "081234567890",
    },
    expiryDate: "2025-02-13T23:59:00.000Z", // Expired
    status: "Expired",
    createdAt: "2025-02-11T10:30:00.000Z",
  },
  {
    bookingCode: "HOTEL-XYZ789",
    roomId: 2,
    roomName: "Superior Room",
    checkin: "2025-07-27T23:59:00.000Z",
    checkout: "2025-02-22T00:00:00.000Z",
    nights: 2,
    totalPrice: 1100000,
    guestData: {
      fullName: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "081987654321",
    },
    expiryDate: "2025-07-28T23:59:00.000Z", // Active
    status: "Active",
    createdAt: "2025-07-05T23:59:00.000Z",
  },
  {
    bookingCode: "HOTEL-DEF456",
    roomId: 3,
    roomName: "Family Suite",
    checkin: "2025-01-10T00:00:00.000Z",
    checkout: "2025-01-12T00:00:00.000Z",
    nights: 2,
    totalPrice: 2400000,
    guestData: {
      fullName: "Ahmad Wijaya",
      email: "ahmad.wijaya@email.com",
      phone: "081555666777",
    },
    expiryDate: "2025-01-08T23:59:00.000Z",
    status: "Used",
    createdAt: "2025-01-05T09:15:00.000Z",
  },
]

type BookingStatus = "Active" | "Expired" | "Used" | "Invalid"

interface BookingResult {
  status: BookingStatus
  booking?: any
  message: string
}

export default function CheckBookingPage() {
  const [bookingCode, setBookingCode] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<BookingResult | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const checkBookingStatus = (booking: any): BookingStatus => {
    const now = new Date()
    const expiryDate = new Date(booking.expiryDate)
    const checkinDate = new Date(booking.checkin)


    if (booking.status === "Used") {
      return "Used"
    }

    if (now > expiryDate) {
      return "Expired"
    }

    if (now > checkinDate) {
      return "Expired"
    }

    return "Active"
  }

  const handleSearch = async () => {
    if (!bookingCode.trim()) {
      alert("Silakan masukkan kode booking")
      return
    }

    setIsSearching(true)

    setTimeout(() => {
      const booking = sampleBookings.find((b) => b.bookingCode.toLowerCase() === bookingCode.toLowerCase())

      if (!booking) {
        setSearchResult({
          status: "Invalid",
          message: "Kode booking tidak ditemukan. Pastikan Anda memasukkan kode yang benar.",
        })
      } else {
        const currentStatus = checkBookingStatus(booking)
        let message = ""

        switch (currentStatus) {
          case "Active":
            message = "Kode booking Anda masih aktif dan dapat digunakan untuk check-in."
            break
          case "Expired":
            message = "Kode booking Anda telah kedaluwarsa. Silakan hubungi customer service untuk bantuan."
            break
          case "Used":
            message = "Kode booking ini telah digunakan untuk check-in sebelumnya."
            break
        }

        setSearchResult({
          status: currentStatus,
          booking: { ...booking, status: currentStatus },
          message,
        })
      }

      setIsSearching(false)
    }, 1500)
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Expired":
        return "bg-red-100 text-red-800 border-red-200"
      case "Used":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Invalid":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "Expired":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "Used":
        return <Clock className="h-5 w-5 text-blue-600" />
      case "Invalid":
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <header className="bg-white mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 flex-col lg:flex-row">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cek Status Booking</h1>
              <p className="text-gray-600">Periksa apakah kode booking Anda masih aktif</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Masukkan Kode Booking
            </CardTitle>
            <CardDescription>Masukkan kode booking Anda untuk memeriksa status dan detail pemesanan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <Input
                  id="bookingCode"
                  type="text"
                  placeholder="Contoh: HOTEL-ABC123"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                  className="h-12 text-lg font-mono text-black bg-white"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching} size="lg" className="h-12 px-8 bg-blue-500">
                {isSearching ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Mencari...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Cek Status
                  </>
                )}
              </Button>
            </div>

            {/* Sample Codes for Testing */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Kode untuk Testing:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">AKTIF</Badge>
                  <code className="font-mono">HOTEL-XYZ789</code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-800 border-red-200">EXPIRED</Badge>
                  <code className="font-mono">HOTEL-ABC123</code>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">USED</Badge>
                  <code className="font-mono">HOTEL-DEF456</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResult && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3">
                {getStatusIcon(searchResult.status)}
                <div>
                  <CardTitle>Status Booking</CardTitle>
                  <Badge className={`mt-1 ${getStatusColor(searchResult.status)}`}>{searchResult.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Alert
                className={`mb-6 ${searchResult.status === "Active"
                    ? "border-green-200 bg-green-50"
                    : searchResult.status === "Invalid"
                      ? "border-gray-200 bg-gray-50"
                      : "border-red-200 bg-red-50"
                  }`}
              >
                <AlertDescription
                  className={
                    searchResult.status === "Active"
                      ? "text-green-800"
                      : searchResult.status === "Invalid"
                        ? "text-gray-800"
                        : "text-red-800"
                  }
                >
                  {searchResult.message}
                </AlertDescription>
              </Alert>

              {searchResult.booking && (
                <div className="space-y-6">
                  {/* Booking Details */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Detail Pemesanan</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Informasi Kamar</h5>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Kode Booking:</strong>{" "}
                              <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                                {searchResult.booking.bookingCode}
                              </code>
                            </p>
                            <p>
                              <strong>Kamar:</strong> {searchResult.booking.roomName}
                            </p>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                <strong>Check-in:</strong>{" "}
                                {format(new Date(searchResult.booking.checkin), "dd MMMM yyyy", { locale: id })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                <strong>Check-out:</strong>{" "}
                                {format(new Date(searchResult.booking.checkout), "dd MMMM yyyy", { locale: id })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>
                                <strong>Durasi:</strong> {searchResult.booking.nights} malam
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Data Tamu</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>{searchResult.booking.guestData.fullName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              <span>{searchResult.booking.guestData.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              <span>{searchResult.booking.guestData.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Status & Waktu</h5>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong>Tanggal Booking:</strong>{" "}
                              {format(new Date(searchResult.booking.createdAt), "dd MMMM yyyy, HH:mm", { locale: id })}
                            </div>
                            <div>
                              <strong>Berlaku Hingga:</strong>{" "}
                              <span
                                className={
                                  searchResult.status === "Expired" ? "text-red-600 font-medium" : "text-gray-900"
                                }
                              >
                                {format(new Date(searchResult.booking.expiryDate), "dd MMMM yyyy, HH:mm", {
                                  locale: id,
                                })}
                              </span>
                            </div>
                            <div>
                              <strong>Status Saat Ini:</strong>{" "}
                              <Badge className={`${getStatusColor(searchResult.status)} ml-1`}>
                                {searchResult.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Total Pembayaran</h5>
                          <div className="text-2xl font-bold text-blue-600">
                            {formatPrice(searchResult.booking.totalPrice)}
                          </div>
                          <p className="text-sm text-gray-500">Dibayar saat check-in</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {searchResult.status === "Active" && (
                      <div className="flex-1">
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            <strong>Booking Anda Aktif!</strong> Tunjukkan kode ini saat check-in di hotel.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    {searchResult.status === "Expired" && (
                      <div className="flex-1">
                        <Alert className="border-red-200 bg-red-50">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-800">
                            <strong>Booking Kedaluwarsa!</strong> Hubungi customer service untuk perpanjangan atau
                            booking ulang.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}

                    <div className="flex gap-2 items-center">
                      <Button onClick={() => window.print()} variant="outline" className="bg-blue-500 text-white">
                        Cetak Detail
                      </Button>
                      {searchResult.status === "Expired" && (
                        <Link href="/">
                          <Button className="bg-blue-600 hover:bg-blue-700">Booking Ulang</Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Butuh Bantuan?</CardTitle>
            <CardDescription>Hubungi customer service kami jika mengalami masalah</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Telepon</p>
                  <p className="text-sm text-gray-600">(021) 1234-5678</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">info@hotelparadise.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Jam Operasional</p>
                  <p className="text-sm text-gray-600">24/7 Setiap Hari</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
