"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LogOut,
  Menu,
  X,
  Cog,
  Search,
  Filter,
  Plus,
  Calendar,
  UserCheck,
  MapPin,
  Clock,
  Users,
} from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
}

interface Guide {
  id: string
  name: string
  phone: string
  languages: string[]
  experience: string
  status: "available" | "assigned" | "unavailable"
}

interface Operation {
  id: string
  operationCode: string
  group: string
  guide: string
  route: string
  startDate: string
  endDate: string
  pax: number
  status: "planned" | "ongoing" | "completed"
  notes: string
}

export default function OperationsPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<"operations" | "guides">("operations")

  const operations: Operation[] = [
    {
      id: "1",
      operationCode: "OP-2025-001",
      group: "Akdeniz Turu",
      guide: "Ahmet Yılmaz",
      route: "İstanbul → Antalya → Belek",
      startDate: "15 Mayıs 2025",
      endDate: "22 Mayıs 2025",
      pax: 45,
      status: "ongoing",
      notes: "VIP transfer, özel rehber hizmeti",
    },
    {
      id: "2",
      operationCode: "OP-2025-002",
      group: "Kapadokya Express",
      guide: "Mehmet Kaya",
      route: "İstanbul → Nevşehir → Kapadokya",
      startDate: "20 Mayıs 2025",
      endDate: "24 Mayıs 2025",
      pax: 32,
      status: "planned",
      notes: "Balon turu dahil, rehber ve şoför koordinasyonu gerekli",
    },
    {
      id: "3",
      operationCode: "OP-2025-003",
      group: "Ege Turu",
      guide: "Ayşe Demir",
      route: "İstanbul → İzmir → Efes → Pamukkale",
      startDate: "10 Mayıs 2025",
      endDate: "17 Mayıs 2025",
      pax: 28,
      status: "ongoing",
      notes: "Antik kentler turu, profesyonel fotoğrafçı eşliğinde",
    },
  ]

  const guides: Guide[] = [
    {
      id: "1",
      name: "Ahmet Yılmaz",
      phone: "+90 555 111 2233",
      languages: ["Türkçe", "İngilizce", "Almanca"],
      experience: "15 yıl",
      status: "assigned",
    },
    {
      id: "2",
      name: "Mehmet Kaya",
      phone: "+90 555 222 3344",
      languages: ["Türkçe", "İngilizce", "Fransızca"],
      experience: "12 yıl",
      status: "available",
    },
    {
      id: "3",
      name: "Ayşe Demir",
      phone: "+90 555 333 4455",
      languages: ["Türkçe", "İngilizce", "Rusça"],
      experience: "10 yıl",
      status: "assigned",
    },
    {
      id: "4",
      name: "Fatma Özkan",
      phone: "+90 555 444 5566",
      languages: ["Türkçe", "İngilizce", "İspanyolca"],
      experience: "8 yıl",
      status: "available",
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

  const getOperationStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "ongoing":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getGuideStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-100 text-emerald-700"
      case "assigned":
        return "bg-amber-100 text-amber-700"
      case "unavailable":
        return "bg-slate-100 text-slate-500"
      default:
        return "bg-slate-100 text-slate-700"
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
            <Cog size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Operasyon</span>}
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
                  <Cog size={28} className="text-cyan-600" />
                  Operasyon & Rehber Modülü
                </h2>
                <p className="text-sm text-slate-500">Operasyon takibi ve rehber yönetimi</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium">
              <Plus size={18} />
              Yeni Operasyon
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {/* Tabs */}
          <div className="mb-6 flex items-center gap-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab("operations")}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === "operations"
                  ? "text-cyan-600 border-b-2 border-cyan-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Operasyonlar
            </button>
            <button
              onClick={() => setActiveTab("guides")}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === "guides"
                  ? "text-cyan-600 border-b-2 border-cyan-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Rehberler
            </button>
          </div>

          {/* Operations Tab */}
          {activeTab === "operations" && (
            <div className="space-y-4">
              {operations.map((operation) => (
                <div
                  key={operation.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{operation.operationCode}</h3>
                      <p className="text-sm text-cyan-600 font-medium">{operation.group}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getOperationStatusColor(operation.status)}`}>
                      {operation.status === "planned" ? "Planlandı" : operation.status === "ongoing" ? "Devam Ediyor" : "Tamamlandı"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <UserCheck size={16} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Rehber</p>
                        <p className="text-sm font-semibold text-slate-900">{operation.guide}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Rota</p>
                        <p className="text-sm font-semibold text-slate-900">{operation.route}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500">Katılımcı</p>
                        <p className="text-sm font-semibold text-slate-900">{operation.pax} PAX</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-600">{operation.startDate} → {operation.endDate}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm text-slate-500">{operation.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Guides Tab */}
          {activeTab === "guides" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                        <UserCheck size={24} className="text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{guide.name}</h3>
                        <p className="text-xs text-slate-500">{guide.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Diller</p>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((lang, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Deneyim</p>
                      <p className="text-sm font-semibold text-slate-900">{guide.experience}</p>
                    </div>

                    <div className="pt-3">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${getGuideStatusColor(guide.status)}`}>
                        {guide.status === "available" ? "Müsait" : guide.status === "assigned" ? "Görevde" : "Müsait Değil"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
