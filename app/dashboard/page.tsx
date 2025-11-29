"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  LogOut,
  Menu,
  X,
  Plane,
  Hotel,
  Users,
  Calendar,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Upload,
} from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
}

interface TodayTask {
  id: string
  type: "flight" | "hotel" | "action"
  title: string
  time: string
  status: "pending" | "completed" | "urgent"
  groupName: string
  pax: number
}

interface Group {
  id: string
  name: string
  dateRange: string
  pax: number
  guide: string
  status: "upcoming" | "ongoing" | "completed"
  flightStatus: string
  hotelStatus: string
}

export default function TravelAgentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Mock data
  const todayTasks: TodayTask[] = [
    {
      id: "1",
      type: "flight",
      title: "İstanbul → Antalya (TK 2134)",
      time: "09:30",
      status: "completed",
      groupName: "Akdeniz Turu",
      pax: 45,
    },
    {
      id: "2",
      type: "hotel",
      title: "Rixos Premium Belek - Check-in",
      time: "14:00",
      status: "pending",
      groupName: "Akdeniz Turu",
      pax: 45,
    },
    {
      id: "3",
      type: "action",
      title: "Rooming List Hazırla",
      time: "11:00",
      status: "urgent",
      groupName: "Kapadokya Express",
      pax: 32,
    },
    {
      id: "4",
      type: "flight",
      title: "Antalya → İstanbul (TK 2145)",
      time: "18:45",
      status: "pending",
      groupName: "Ege Turu",
      pax: 28,
    },
  ]

  const myGroups: Group[] = [
    {
      id: "1",
      name: "Akdeniz Turu",
      dateRange: "15-22 Mayıs 2025",
      pax: 45,
      guide: "Ahmet Yılmaz",
      status: "ongoing",
      flightStatus: "Tamamlandı",
      hotelStatus: "Rooming List Bekliyor",
    },
    {
      id: "2",
      name: "Kapadokya Express",
      dateRange: "20-24 Mayıs 2025",
      pax: 32,
      guide: "Mehmet Kaya",
      status: "upcoming",
      flightStatus: "Onaylandı",
      hotelStatus: "Kontrat Hazır",
    },
    {
      id: "3",
      name: "Ege Turu",
      dateRange: "10-17 Mayıs 2025",
      pax: 28,
      guide: "Ayşe Demir",
      status: "ongoing",
      flightStatus: "Onaylandı",
      hotelStatus: "Tamamlandı",
    },
    {
      id: "4",
      name: "Karadeniz Keşfi",
      dateRange: "1-8 Haziran 2025",
      pax: 38,
      guide: "Fatma Özkan",
      status: "upcoming",
      flightStatus: "Bekliyor",
      hotelStatus: "Bekliyor",
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
      if (userData.department !== "travel_agent") {
        router.push("/")
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "urgent":
        return "bg-rose-100 text-rose-700 border-rose-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getGroupStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-700"
      case "upcoming":
        return "bg-purple-100 text-purple-700"
      case "completed":
        return "bg-slate-100 text-slate-700"
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
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu size={18} className="text-slate-600" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { icon: Calendar, label: "Dashboard", active: true },
            { icon: Plane, label: "Uçuşlarım" },
            { icon: Hotel, label: "Otellerim" },
            { icon: Users, label: "Gruplarım" },
            { icon: FileText, label: "Voucher'larım" },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
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
            title={!sidebarOpen ? "Çıkış Yap" : undefined}
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
              {sidebarOpen ? (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-600" />
                </button>
              ) : (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu size={20} className="text-slate-600" />
                </button>
              )}
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Travel Agent Dashboard</h2>
                <p className="text-sm text-slate-500">Hoş geldiniz, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-slate-100 text-sm font-medium text-slate-700">🇹🇷 TR</div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Quick Actions */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="p-4 bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <Plus size={24} className="flex-shrink-0" />
                <span className="text-sm font-semibold">Yeni Rezervasyon</span>
              </button>
              <button className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <Upload size={24} className="flex-shrink-0" />
                <span className="text-sm font-semibold">Excel Yükle</span>
              </button>
              <button className="p-4 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <FileText size={24} className="flex-shrink-0" />
                <span className="text-sm font-semibold">Voucher Oluştur</span>
              </button>
              <button className="p-4 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-3 group">
                <AlertCircle size={24} className="flex-shrink-0" />
                <span className="text-sm font-semibold">Not/Şikayet Ekle</span>
              </button>
            </div>

            {/* Today's Tasks */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock size={24} className="text-cyan-600" />
                Bugünkü İşlerim
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {task.type === "flight" && (
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Plane size={20} className="text-blue-600" />
                          </div>
                        )}
                        {task.type === "hotel" && (
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Hotel size={20} className="text-purple-600" />
                          </div>
                        )}
                        {task.type === "action" && (
                          <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                            <FileText size={20} className="text-rose-600" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">{task.title}</p>
                          <p className="text-xs text-slate-500">{task.groupName} • {task.pax} PAX</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                        {task.time}
                      </span>
                    </div>
                    {task.status === "urgent" && (
                      <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-medium">
                        ⚠️ Acil İşlem Gerekiyor
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* My Groups */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users size={24} className="text-cyan-600" />
                Gruplarım
              </h3>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Grup Adı
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Tarih
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          PAX
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Rehber
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Uçuş
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Otel
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Durum
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {myGroups.map((group) => (
                        <tr key={group.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-900">{group.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600">{group.dateRange}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm font-medium text-slate-900">{group.pax}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600">{group.guide}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                              {group.flightStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                              {group.hotelStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getGroupStatusColor(group.status)}`}>
                              {group.status === "ongoing" ? "Devam Ediyor" : group.status === "upcoming" ? "Yaklaşan" : "Tamamlandı"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
