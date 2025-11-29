"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Plane,
  Calendar,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ArrowLeft,
  BarChart3,
  PieChart,
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

interface AdminStat {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: any
  color: string
  bgColor: string
}

interface DepartmentData {
  name: string
  users: number
  activeProjects: number
  revenue: string
  status: "excellent" | "good" | "warning"
}

export default function AdminDashboard() {
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
      if (userData.role !== "admin") {
        router.push("/dashboard")
        return
      }
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

  // Admin İstatistikleri
  const adminStats: AdminStat[] = [
    {
      title: "Toplam Gelir (Aylık)",
      value: "₺2.4M",
      change: 12.5,
      changeLabel: "Geçen aya göre",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Aktif Kullanıcılar",
      value: 148,
      change: 8.2,
      changeLabel: "Bu hafta",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Toplam Rezervasyon",
      value: 2847,
      change: 15.3,
      changeLabel: "Bu ay",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Sistem Performansı",
      value: "98.5%",
      change: 2.1,
      changeLabel: "Uptime",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  // Departman Verileri
  const departmentData: DepartmentData[] = [
    {
      name: "Rezervasyon Departmanı",
      users: 24,
      activeProjects: 156,
      revenue: "₺890K",
      status: "excellent",
    },
    {
      name: "Uçak Departmanı",
      users: 18,
      activeProjects: 89,
      revenue: "₺650K",
      status: "good",
    },
    {
      name: "Operasyon Departmanı",
      users: 32,
      activeProjects: 142,
      revenue: "₺520K",
      status: "excellent",
    },
    {
      name: "Yönetim Departmanı",
      users: 12,
      activeProjects: 45,
      revenue: "₺380K",
      status: "good",
    },
  ]

  // Grafik verileri (Mock)
  const chartData = [
    { month: "Oca", value: 65 },
    { month: "Şub", value: 78 },
    { month: "Mar", value: 72 },
    { month: "Nis", value: 85 },
    { month: "May", value: 92 },
    { month: "Haz", value: 88 },
  ]
  const maxValue = Math.max(...chartData.map((d) => d.value))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 fixed h-screen z-40 flex flex-col shadow-lg`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Shield size={24} className="text-purple-600" />
              </div>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-slate-900 text-lg">Admin Panel</h1>
                <p className="text-xs text-slate-500">Yönetim Merkezi</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
            data-testid="admin-dashboard-nav"
          >
            <LayoutDashboard size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Admin Dashboard</span>}
          </button>

          <div className="pt-4 pb-2">
            {sidebarOpen && <p className="px-4 text-xs font-semibold text-slate-400 uppercase">Yönetim</p>}
          </div>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-purple-50 transition-all"
            data-testid="users-management-nav"
          >
            <Users size={20} className="flex-shrink-0 text-purple-600" />
            {sidebarOpen && <span className="text-sm font-medium">Kullanıcı Yönetimi</span>}
          </button>

          <button
            onClick={() => router.push("/reservations")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 transition-all"
            data-testid="reservations-management-nav"
          >
            <Calendar size={20} className="flex-shrink-0 text-blue-600" />
            {sidebarOpen && <span className="text-sm font-medium">Rezervasyonlar</span>}
          </button>

          <button
            onClick={() => router.push("/flights")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-orange-50 transition-all"
            data-testid="flights-management-nav"
          >
            <Plane size={20} className="flex-shrink-0 text-orange-600" />
            {sidebarOpen && <span className="text-sm font-medium">Uçak Yönetimi</span>}
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-green-50 transition-all"
            data-testid="reports-nav"
          >
            <BarChart3 size={20} className="flex-shrink-0 text-green-600" />
            {sidebarOpen && <span className="text-sm font-medium">Raporlar</span>}
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition-all"
            data-testid="settings-nav"
          >
            <Settings size={20} className="flex-shrink-0 text-slate-600" />
            {sidebarOpen && <span className="text-sm font-medium">Sistem Ayarları</span>}
          </button>

          <div className="pt-4 pb-2">
            {sidebarOpen && <p className="px-4 text-xs font-semibold text-slate-400 uppercase">Hızlı Erişim</p>}
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-600 hover:bg-blue-50 transition-all border border-blue-200"
            data-testid="back-to-main-dashboard"
          >
            <ArrowLeft size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Ana Dashboard'a Dön</span>}
          </button>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          {sidebarOpen && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50">
              <p className="text-xs text-slate-500 mb-1">Admin Kullanıcı</p>
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
            data-testid="admin-logout-button"
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
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Shield size={28} className="text-purple-600" />
                  Admin Yönetim Paneli
                </h2>
                <p className="text-sm text-slate-500">Sistem kontrolü ve performans takibi</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ara..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button className="p-2 hover:bg-slate-100 rounded-lg relative">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Welcome Message */}
          <div className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Hoş Geldiniz, {user.name}! 👋</h3>
            <p className="text-purple-100">
              Sistem yöneticisi olarak tüm departmanlar ve işlemler üzerinde tam kontrol sahibisiniz.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {adminStats.map((stat, index) => {
              const Icon = stat.icon
              const isPositive = stat.change > 0
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                  data-testid={`admin-stat-${index}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon size={24} className={stat.color} />
                    </div>
                    <div className="flex items-center gap-1">
                      {isPositive ? (
                        <TrendingUp size={16} className="text-green-600" />
                      ) : (
                        <TrendingDown size={16} className="text-red-600" />
                      )}
                      <span
                        className={`text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
                      >
                        {isPositive ? "+" : ""}
                        {stat.change}%
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm text-slate-600 mb-1">{stat.title}</h3>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.changeLabel}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Aylık Performans Grafiği</h3>
                  <p className="text-sm text-slate-500">Son 6 ayın gelir trendi</p>
                </div>
                <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option>Son 6 Ay</option>
                  <option>Son 12 Ay</option>
                  <option>Bu Yıl</option>
                </select>
              </div>

              <div className="h-64 flex items-end justify-around gap-4">
                {chartData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full relative flex items-end" style={{ height: "200px" }}>
                      <div
                        className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-xl transition-all duration-300 hover:from-purple-600 hover:to-blue-600 relative group-hover:shadow-lg"
                        style={{ height: `${(data.value / maxValue) * 100}%` }}
                      >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                          {data.value}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-600">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Users className="text-blue-600" size={24} />
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                <p className="text-sm text-blue-700 font-medium mb-1">Aktif Kullanıcılar</p>
                <p className="text-3xl font-bold text-slate-900">842</p>
                <p className="text-xs text-green-600 font-semibold mt-2">↑ +12% bu hafta</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Calendar className="text-orange-600" size={24} />
                  <Activity className="text-orange-600" size={20} />
                </div>
                <p className="text-sm text-orange-700 font-medium mb-1">Günlük İşlemler</p>
                <p className="text-3xl font-bold text-slate-900">1,247</p>
                <p className="text-xs text-slate-500 mt-2">Ortalama: 1,180/gün</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <Activity className="text-green-600" size={24} />
                </div>
                <p className="text-sm text-green-700 font-medium mb-1">Sistem Durumu</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-bold text-green-700">Tüm Sistemler Aktif</p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Departman Genel Bakış</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Departman</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Kullanıcılar</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">
                      Aktif Projeler
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Gelir</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase">Durum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {departmentData.map((dept, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      data-testid={`department-row-${index}`}
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{dept.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{dept.users} kullanıcı</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900">{dept.activeProjects}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-green-600">{dept.revenue}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            dept.status === "excellent"
                              ? "bg-green-100 text-green-700"
                              : dept.status === "good"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {dept.status === "excellent"
                            ? "Mükemmel"
                            : dept.status === "good"
                              ? "İyi"
                              : "Dikkat"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
