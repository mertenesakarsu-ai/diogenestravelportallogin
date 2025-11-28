"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LogOut,
  Menu,
  X,
  BarChart3,
  Users,
  Plane,
  Cog,
  BookOpen,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
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
        router.push(`/dashboard/${userData.department}`)
        return
      }
      setUser(userData)
    } catch (error) {
      console.error("[v0] Error parsing user data:", error)
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

  const departments = [
    {
      name: "Rezarvasyon",
      icon: BookOpen,
      value: 2847,
      label: "Aktif Rezervasyon",
      trend: 12,
      color: "bg-blue-500",
      lightColor: "bg-blue-100 dark:bg-blue-950",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Uçak",
      icon: Plane,
      value: 156,
      label: "Kayıtlı Uçak",
      trend: 8,
      color: "bg-orange-500",
      lightColor: "bg-orange-100 dark:bg-orange-950",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      name: "Operasyon",
      icon: Cog,
      value: 142,
      label: "Aktif İşlem",
      trend: -3,
      color: "bg-green-500",
      lightColor: "bg-green-100 dark:bg-green-950",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      name: "Yönetim",
      icon: Users,
      value: 18456,
      label: "Günlük Gelir",
      trend: 15,
      color: "bg-purple-500",
      lightColor: "bg-purple-100 dark:bg-purple-950",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ]

  const chartData = [65, 78, 72, 85, 92, 88, 95, 87, 91, 84, 89, 96]
  const maxValue = Math.max(...chartData)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-card border-r border-border transition-all duration-300 fixed h-screen z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <h1 className="font-bold text-foreground text-base leading-tight">Diogenes</h1>
                <p className="text-xs text-muted-foreground">Travel Portal</p>
              </div>
            )}
          </div>
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-accent rounded-lg transition-colors">
              <Menu size={18} />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { icon: BarChart3, label: "Dashboard", active: true },
            { icon: BookOpen, label: "Rezervasyonlar" },
            { icon: Plane, label: "Uçak Yönetimi" },
            { icon: Cog, label: "Operasyon" },
            { icon: Users, label: "Yönetim" },
            { icon: Users, label: "Kullanıcılar" },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          {sidebarOpen && (
            <div className="p-3 rounded-xl bg-accent/50">
              <p className="text-xs text-muted-foreground mb-1">Oturum Açık:</p>
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
            title={!sidebarOpen ? "Çıkış Yap" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      <main className={`flex-1 ${sidebarOpen ? "ml-72" : "ml-20"} transition-all duration-300 flex flex-col`}>
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {sidebarOpen ? (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              ) : (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  <Menu size={20} />
                </button>
              )}
              <div>
                <h2 className="text-2xl font-bold text-foreground">Admin Paneli</h2>
                <p className="text-sm text-muted-foreground">Sistem kontrolü ve yönetimi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-accent text-sm font-medium text-foreground">🇹🇷 TR</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-1">Hoş geldiniz, {user.name}! 👋</h3>
              <p className="text-muted-foreground">
                Sistem yöneticisi olarak tüm departmanlar ve işlemler üzerinde tam kontrol sahibisiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {departments.map((dept, idx) => {
                const Icon = dept.icon
                return (
                  <div
                    key={idx}
                    className={`${dept.lightColor} border border-border rounded-2xl p-6 hover:shadow-lg hover:border-foreground/10 transition-all duration-300 group cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 ${dept.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-bold ${dept.trend >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        <TrendingUp size={16} className={dept.trend < 0 ? "rotate-180" : ""} />
                        {dept.trend >= 0 ? "+" : ""}
                        {dept.trend}%
                      </div>
                    </div>
                    <h4 className={`text-sm font-medium ${dept.textColor} mb-2`}>{dept.label}</h4>
                    <p className="text-3xl font-bold text-foreground">{dept.value.toLocaleString("tr-TR")}</p>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Aylık Performans</h3>
                    <p className="text-sm text-muted-foreground">Son 12 ayın verisi</p>
                  </div>
                  <select className="px-4 py-2 rounded-lg bg-accent text-foreground text-sm font-medium border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Son 12 Ay</option>
                    <option>Son 6 Ay</option>
                    <option>Son 3 Ay</option>
                  </select>
                </div>

                <div className="h-72 flex items-end justify-around gap-3 px-2 py-8 bg-accent/30 rounded-xl">
                  {chartData.map((value, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-full relative">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-xl transition-all duration-200 hover:from-blue-600 hover:to-blue-500 hover:shadow-lg"
                          style={{
                            height: `${(value / maxValue) * 100}%`,
                            minHeight: "20px",
                          }}
                        />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <Users className="text-blue-600 dark:text-blue-400" size={24} />
                    <CheckCircle2 className="text-green-600" size={18} />
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Toplam Kullanıcı</p>
                  <p className="text-3xl font-bold text-foreground">5,234</p>
                  <p className="text-xs text-green-600 font-semibold mt-3">↑ 12% bu ay</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                    <AlertCircle className="text-orange-600" size={18} />
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-1">Aktif Oturumlar</p>
                  <p className="text-3xl font-bold text-foreground">842</p>
                  <p className="text-xs text-muted-foreground mt-3">Şu anda sistem kullanıcısı</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200 dark:border-green-800 rounded-2xl p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium mb-1">Sistem Durumu</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-sm font-bold text-green-600">Mükemmel Çalışıyor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
