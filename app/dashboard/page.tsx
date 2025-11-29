"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Plane,
  Hotel,
  Calendar,
  Users,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Menu,
  X,
  Shield,
} from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
}

interface Stats {
  title: string
  value: string | number
  change: string
  icon: any
  color: string
  bgColor: string
}

interface RecentActivity {
  id: string
  title: string
  description: string
  time: string
  type: "flight" | "hotel" | "reservation" | "operation"
  status: "success" | "warning" | "info"
}

export default function MainDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  // Dashboard İstatistikleri
  const stats: Stats[] = [
    {
      title: "Aktif Rezervasyonlar",
      value: 156,
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Bugünkü Uçuşlar",
      value: 8,
      change: "+2",
      icon: Plane,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Doluluk Oranı",
      value: "87%",
      change: "+5%",
      icon: Hotel,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Bekleyen İşlemler",
      value: 23,
      change: "-4",
      icon: AlertCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  // Son Aktiviteler
  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      title: "Yeni Rezervasyon",
      description: "Akdeniz Turu - 45 PAX",
      time: "10 dk önce",
      type: "reservation",
      status: "success",
    },
    {
      id: "2",
      title: "Uçuş Güncellemesi",
      description: "TK 2134 - Saat değişikliği",
      time: "25 dk önce",
      type: "flight",
      status: "warning",
    },
    {
      id: "3",
      title: "Otel Onayı",
      description: "Rixos Premium Belek - Rooming list onaylandı",
      time: "1 saat önce",
      type: "hotel",
      status: "success",
    },
    {
      id: "4",
      title: "Operasyon Notu",
      description: "Kapadokya Express - Transfer güncelleme",
      time: "2 saat önce",
      type: "operation",
      status: "info",
    },
  ]

  // Departman Menüleri
  const departments = [
    {
      name: "Rezervasyon Departmanı",
      icon: Calendar,
      href: "/reservations",
      color: "from-blue-500 to-blue-600",
      description: "Tüm rezervasyonları yönet",
    },
    {
      name: "Uçak Departmanı",
      icon: Plane,
      href: "/flights",
      color: "from-orange-500 to-orange-600",
      description: "Uçuş planlaması ve takibi",
    },
    {
      name: "Operasyon Departmanı",
      icon: Users,
      href: "/operations",
      color: "from-green-500 to-green-600",
      description: "Operasyon ve rehber yönetimi",
    },
    {
      name: "Yönetim Departmanı",
      icon: Settings,
      href: "/management",
      color: "from-purple-500 to-purple-600",
      description: "Raporlar ve analizler",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 fixed h-screen z-40 flex flex-col shadow-lg`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-orange-500 to-green-500 flex items-center justify-center flex-shrink-0 shadow-md p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="object-contain p-1" />
              </div>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-slate-900 text-lg">Diogenes Travel</h1>
                <p className="text-xs text-slate-500">Portal Sistemi</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
            data-testid="dashboard-nav-button"
          >
            <LayoutDashboard size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Ana Dashboard</span>}
          </button>

          <div className="pt-4 pb-2">
            {sidebarOpen && <p className="px-4 text-xs font-semibold text-slate-400 uppercase">Departmanlar</p>}
          </div>

          <button
            onClick={() => router.push("/reservations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 transition-all"
            data-testid="reservations-nav-button"
          >
            <Calendar size={20} className="flex-shrink-0 text-blue-600" />
            {sidebarOpen && <span className="text-sm font-medium">Rezervasyon</span>}
          </button>

          <button
            onClick={() => router.push("/flights")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-50 transition-all"
            data-testid="flights-nav-button"
          >
            <Plane size={20} className="flex-shrink-0 text-orange-600" />
            {sidebarOpen && <span className="text-sm font-medium">Uçak Departmanı</span>}
          </button>

          <button
            onClick={() => router.push("/operations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-green-50 transition-all"
            data-testid="operations-nav-button"
          >
            <Users size={20} className="flex-shrink-0 text-green-600" />
            {sidebarOpen && <span className="text-sm font-medium">Operasyon</span>}
          </button>

          <button
            onClick={() => router.push("/management")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-purple-50 transition-all"
            data-testid="management-nav-button"
          >
            <Settings size={20} className="flex-shrink-0 text-purple-600" />
            {sidebarOpen && <span className="text-sm font-medium">Yönetim</span>}
          </button>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          {sidebarOpen && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50">
              <p className="text-xs text-slate-500 mb-1">Aktif Kullanıcı</p>
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
            data-testid="logout-button"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? "ml-72" : "ml-20"} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Hoş Geldiniz, {user.name}!</h2>
                <p className="text-sm text-slate-500">Bugünün özeti ve genel bakış</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Admin Button - Only for admin role */}
              {user.role === "admin" && (
                <button
                  onClick={() => router.push("/admin/dashboard")}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                  data-testid="admin-dashboard-button"
                >
                  <Shield size={18} />
                  <span>Admin Panel</span>
                </button>
              )}

              <button className="p-2 hover:bg-slate-100 rounded-lg relative">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                  data-testid={`stat-card-${index}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon size={24} className={stat.color} />
                    </div>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        stat.change.startsWith("+") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-sm text-slate-600 mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              )
            })}
          </div>

          {/* Departman Kartları */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Departmanlar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => {
                const Icon = dept.icon
                return (
                  <button
                    key={index}
                    onClick={() => router.push(dept.href)}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all text-left"
                    data-testid={`department-card-${index}`}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-between">
                      {dept.name}
                      <ChevronRight size={20} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </h4>
                    <p className="text-sm text-slate-600">{dept.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Son Aktiviteler</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Tümünü Gör</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  data-testid={`activity-${activity.id}`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.status === "success"
                        ? "bg-green-100"
                        : activity.status === "warning"
                          ? "bg-orange-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {activity.status === "success" ? (
                      <CheckCircle2
                        size={20}
                        className={
                          activity.status === "success"
                            ? "text-green-600"
                            : activity.status === "warning"
                              ? "text-orange-600"
                              : "text-blue-600"
                        }
                      />
                    ) : (
                      <Clock size={20} className="text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{activity.title}</h4>
                    <p className="text-sm text-slate-600">{activity.description}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
