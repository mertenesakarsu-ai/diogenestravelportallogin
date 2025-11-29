"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LogOut,
  Menu,
  X,
  BookOpen,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
}

interface Reservation {
  id: string
  reservationNumber: string
  customerName: string
  email: string
  phone: string
  group: string
  pax: number
  checkIn: string
  checkOut: string
  totalAmount: number
  paymentStatus: "paid" | "pending" | "partial"
  status: "confirmed" | "pending" | "cancelled"
}

export default function ReservationsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const reservations: Reservation[] = [
    {
      id: "1",
      reservationNumber: "RES-2025-001",
      customerName: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      phone: "+90 555 123 4567",
      group: "Akdeniz Turu",
      pax: 2,
      checkIn: "15 Mayıs 2025",
      checkOut: "22 Mayıs 2025",
      totalAmount: 15000,
      paymentStatus: "paid",
      status: "confirmed",
    },
    {
      id: "2",
      reservationNumber: "RES-2025-002",
      customerName: "Mehmet Kaya",
      email: "mehmet@example.com",
      phone: "+90 555 234 5678",
      group: "Kapadokya Express",
      pax: 4,
      checkIn: "20 Mayıs 2025",
      checkOut: "24 Mayıs 2025",
      totalAmount: 28000,
      paymentStatus: "partial",
      status: "confirmed",
    },
    {
      id: "3",
      reservationNumber: "RES-2025-003",
      customerName: "Ayşe Demir",
      email: "ayse@example.com",
      phone: "+90 555 345 6789",
      group: "Ege Turu",
      pax: 3,
      checkIn: "10 Mayıs 2025",
      checkOut: "17 Mayıs 2025",
      totalAmount: 21000,
      paymentStatus: "paid",
      status: "confirmed",
    },
    {
      id: "4",
      reservationNumber: "RES-2025-004",
      customerName: "Fatma Özkan",
      email: "fatma@example.com",
      phone: "+90 555 456 7890",
      group: "Karadeniz Keşfi",
      pax: 2,
      checkIn: "1 Haziran 2025",
      checkOut: "8 Haziran 2025",
      totalAmount: 18000,
      paymentStatus: "pending",
      status: "pending",
    },
  ]

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const authToken = localStorage.getItem("auth_token")

    if (!authToken || !storedUser) {
      router.push("/")
      return
    }

    try {
      const userData = JSON.parse(storedUser)
      setUser(userData)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/")
      return
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-700"
      case "partial":
        return "bg-amber-100 text-amber-700"
      case "pending":
        return "bg-rose-100 text-rose-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 fixed h-screen z-40 flex flex-col shadow-sm`}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <h1 className="font-bold text-slate-900 text-base leading-tight">Diogenes</h1>
                <p className="text-xs text-slate-500">Travel Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-600 hover:bg-slate-50"
          >
            <Calendar size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Dashboard</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md">
            <BookOpen size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Rezervasyonlar</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-3">
          {sidebarOpen && (
            <div className="p-3 rounded-xl bg-slate-50">
              <p className="text-xs text-slate-500 mb-1">Oturum Açık:</p>
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-sm font-medium"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "ml-72" : "ml-20"} transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen size={28} className="text-cyan-600" />
                  Rezervasyon Modülü
                </h2>
                <p className="text-sm text-slate-500">Tüm rezervasyonları yönetin</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium">
              <Plus size={18} />
              Yeni Rezervasyon
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Search and Filter */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rezervasyon no, müşteri adı veya grup ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 font-medium text-slate-700">
              <Filter size={18} />
              Filtrele
            </button>
          </div>

          {/* Reservations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{reservation.reservationNumber}</h3>
                    <p className="text-sm text-cyan-600 font-medium">{reservation.group}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusColor(reservation.status)}`}>
                    {reservation.status === "confirmed" ? "Onaylandı" : reservation.status === "pending" ? "Bekliyor" : "İptal"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <User size={16} className="text-slate-400" />
                    <span className="font-medium text-slate-900">{reservation.customerName}</span>
                    <span className="text-slate-500">• {reservation.pax} PAX</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-slate-400" />
                    <span className="text-slate-600">{reservation.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-slate-400" />
                    <span className="text-slate-600">{reservation.phone}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="text-slate-600">{reservation.checkIn} → {reservation.checkOut}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-slate-400" />
                      <span className="text-lg font-bold text-slate-900">{reservation.totalAmount.toLocaleString("tr-TR")} ₺</span>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getPaymentStatusColor(reservation.paymentStatus)}`}>
                      {reservation.paymentStatus === "paid" ? "Ödendi" : reservation.paymentStatus === "partial" ? "Kısmi" : "Bekliyor"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
