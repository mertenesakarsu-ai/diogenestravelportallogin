"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LogOut,
  Menu,
  X,
  Plane,
  Search,
  Filter,
  Plus,
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
}

interface Flight {
  id: string
  flightNumber: string
  airline: string
  from: string
  to: string
  departureDate: string
  departureTime: string
  arrivalTime: string
  pax: number
  group: string
  status: "scheduled" | "boarding" | "departed" | "arrived" | "cancelled"
  aircraft: string
}

export default function FlightsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock flights data
  const flights: Flight[] = [
    {
      id: "1",
      flightNumber: "TK 2134",
      airline: "Turkish Airlines",
      from: "İstanbul (IST)",
      to: "Antalya (AYT)",
      departureDate: "15 Mayıs 2025",
      departureTime: "09:30",
      arrivalTime: "11:15",
      pax: 45,
      group: "Akdeniz Turu",
      status: "departed",
      aircraft: "Boeing 737-800",
    },
    {
      id: "2",
      flightNumber: "TK 2145",
      airline: "Turkish Airlines",
      from: "Antalya (AYT)",
      to: "İstanbul (IST)",
      departureDate: "22 Mayıs 2025",
      departureTime: "18:45",
      arrivalTime: "20:30",
      pax: 45,
      group: "Akdeniz Turu",
      status: "scheduled",
      aircraft: "Boeing 737-800",
    },
    {
      id: "3",
      flightNumber: "PC 2856",
      airline: "Pegasus Airlines",
      from: "İstanbul (SAW)",
      to: "Nevşehir (NAV)",
      departureDate: "20 Mayıs 2025",
      departureTime: "06:45",
      arrivalTime: "08:00",
      pax: 32,
      group: "Kapadokya Express",
      status: "scheduled",
      aircraft: "Airbus A320",
    },
    {
      id: "4",
      flightNumber: "PC 2857",
      airline: "Pegasus Airlines",
      from: "Nevşehir (NAV)",
      to: "İstanbul (SAW)",
      departureDate: "24 Mayıs 2025",
      departureTime: "20:15",
      arrivalTime: "21:45",
      pax: 32,
      group: "Kapadokya Express",
      status: "scheduled",
      aircraft: "Airbus A320",
    },
    {
      id: "5",
      flightNumber: "TK 2310",
      airline: "Turkish Airlines",
      from: "İstanbul (IST)",
      to: "İzmir (ADB)",
      departureDate: "10 Mayıs 2025",
      departureTime: "13:20",
      arrivalTime: "14:30",
      pax: 28,
      group: "Ege Turu",
      status: "arrived",
      aircraft: "Airbus A321",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "boarding":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "departed":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "arrived":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Planlandı"
      case "boarding":
        return "Boarding"
      case "departed":
        return "Kalktı"
      case "arrived":
        return "İniş Yaptı"
      case "cancelled":
        return "İptal"
      default:
        return status
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
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
          >
            <Plane size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Uçuşlar</span>}
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
                  <Plane size={28} className="text-cyan-600" />
                  Uçak Departmanı
                </h2>
                <p className="text-sm text-slate-500">Tüm uçuşları yönetin</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium">
              <Plus size={18} />
              Yeni Uçuş
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
                placeholder="Uçuş numarası, grup adı veya rota ile ara..."
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

          {/* Flights List */}
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                      <Plane size={28} className="text-cyan-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{flight.flightNumber}</h3>
                      <p className="text-sm text-slate-500">{flight.airline}</p>
                      <p className="text-xs text-slate-400 mt-1">{flight.aircraft}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusColor(flight.status)}`}>
                    {getStatusLabel(flight.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Kalkış</p>
                      <p className="text-sm font-semibold text-slate-900">{flight.from}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Varış</p>
                      <p className="text-sm font-semibold text-slate-900">{flight.to}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Tarih & Saat</p>
                      <p className="text-sm font-semibold text-slate-900">{flight.departureDate}</p>
                      <p className="text-xs text-slate-500">{flight.departureTime} - {flight.arrivalTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Yolcu & Grup</p>
                      <p className="text-sm font-semibold text-slate-900">{flight.pax} PAX</p>
                      <p className="text-xs text-cyan-600 font-medium">{flight.group}</p>
                    </div>
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
