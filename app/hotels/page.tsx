"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LogOut,
  Menu,
  X,
  Hotel,
  Search,
  Filter,
  Plus,
  MapPin,
  Star,
  Utensils,
  FileText,
  Calendar,
} from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
}

interface HotelData {
  id: string
  name: string
  city: string
  region: string
  category: string
  boardType: string
  status: "active" | "inactive"
  contractPeriod: string
  notes: string
}

export default function HotelsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const hotels: HotelData[] = [
    {
      id: "1",
      name: "Rixos Premium Belek",
      city: "Antalya",
      region: "Belek",
      category: "5*",
      boardType: "Ultra All Inclusive",
      status: "active",
      contractPeriod: "1 Mayıs - 31 Ekim 2025",
      notes: "Premium kategori, denize sıfır, 500 oda kapasiteli",
    },
    {
      id: "2",
      name: "Regnum Carya Golf Resort",
      city: "Antalya",
      region: "Belek",
      category: "5*",
      boardType: "Ultra All Inclusive",
      status: "active",
      contractPeriod: "1 Nisan - 31 Ekim 2025",
      notes: "Golf sahası, kongre merkezi mevcut",
    },
    {
      id: "3",
      name: "Hilton Kayseri",
      city: "Kayseri",
      region: "Merkez",
      category: "5*",
      boardType: "Bed & Breakfast",
      status: "active",
      contractPeriod: "Yıl boyu",
      notes: "Kapadokya turları için standart otel, şehir merkezi",
    },
    {
      id: "4",
      name: "Doubletree by Hilton Avanos",
      city: "Nevşehir",
      region: "Avanos",
      category: "5*",
      boardType: "Half Board",
      status: "active",
      contractPeriod: "Yıl boyu",
      notes: "Kapadokya'da merkezi konum, balon turları için ideal",
    },
    {
      id: "5",
      name: "The Marmara Bodrum",
      city: "Muğla",
      region: "Bodrum",
      category: "5*",
      boardType: "All Inclusive",
      status: "active",
      contractPeriod: "15 Mayıs - 15 Ekim 2025",
      notes: "Boutique otel, lüks segment",
    },
    {
      id: "6",
      name: "Van Royal Hotel",
      city: "Van",
      region: "Merkez",
      category: "4*",
      boardType: "Bed & Breakfast",
      status: "inactive",
      contractPeriod: "Kontrat yenileme aşamasında",
      notes: "Van turları için standart, Van Gölü manzaralı",
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
    return status === "active" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
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
            <Hotel size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Oteller</span>}
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
                  <Hotel size={28} className="text-cyan-600" />
                  Oteller & Kontratlar
                </h2>
                <p className="text-sm text-slate-500">Otel veritabanı ve kontrat yönetimi</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium">
              <Plus size={18} />
              Yeni Otel
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
                placeholder="Otel adı, şehir veya bölge ile ara..."
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

          {/* Hotels Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Hotel size={28} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600">{hotel.city}, {hotel.region}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusColor(hotel.status)}`}>
                    {hotel.status === "active" ? "Aktif" : "Pasif"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Star size={16} className="text-amber-500" />
                    <span className="font-semibold text-slate-900">{hotel.category}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Utensils size={16} className="text-slate-400" />
                    <span className="text-slate-600">{hotel.boardType}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="text-slate-600">{hotel.contractPeriod}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-start gap-2">
                      <FileText size={16} className="text-slate-400 mt-0.5" />
                      <p className="text-sm text-slate-500 leading-relaxed">{hotel.notes}</p>
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
