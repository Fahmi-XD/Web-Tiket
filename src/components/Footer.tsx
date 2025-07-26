import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HP</span>
              </div>
              <span className="text-xl font-bold">Hotel Paradise</span>
            </div>
            <p className="text-gray-400 mb-4">
              Hotel mewah dengan pelayanan terbaik di jantung kota Jakarta. Pengalaman menginap yang tak terlupakan
              menanti Anda.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-white transition-colors">
                  Kamar
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">
                  Fasilitas
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Booking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Room Service</li>
              <li>Laundry</li>
              <li>Airport Transfer</li>
              <li>Event & Meeting</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-2 text-gray-400">
              <p>Jl. Sudirman No. 123</p>
              <p>Jakarta Pusat, 10220</p>
              <p>(021) 1234-5678</p>
              <p>info@hotelparadise.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Hotel Paradise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}