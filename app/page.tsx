"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  Eye,
  EyeOff,
  AlertCircle,
  Menu,
  X,
  LogOut,
  Home,
  Plane,
  Calendar,
  Users,
  FileText,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  MoreVertical,
  DollarSign,
  Ticket,
  BarChart3,
} from "lucide-react"

// ==================== RESERVATIONS DASHBOARD ====================
function ReservationsDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("active")

  const reservations = [
    {
      id: "RES-001",
      tourName: "Kapadokya Turu",
      hotel: "Cappadocia Elite Hotel",
      dates: "15-20 Aralık 2024",
      pax: 24,
      revenue: "$18,500",
      status: "Confirmed",
      guide: "Ahmet Yılmaz",
    },
    {
      id: "RES-002",
      tourName: "Pamukkale & Bodrum",
      hotel: "Bodrum Grand Resort",
      dates: "22-28 Aralık 2024",
      pax: 18,
      revenue: "$14,200",
      status: "Pending",
      guide: "Meryem Demir",
    },
    {
      id: "RES-003",
      tourName: "Efes Turu",
      hotel: "Efes Hotel",
      dates: "29 Aralık - 2 Ocak",
      pax: 32,
      revenue: "$24,800",
      status: "Confirmed",
      guide: "Mehmet Kaya",
    },
  ]

  const stats = [
    { label: "Aktif Rezervasyon", value: "156", icon: Ticket, color: "from-blue-500 to-blue-600" },
    { label: "Toplam Konuk", value: "2,847", icon: Users, color: "from-green-500 to-green-600" },
    { label: "Yaklaşan Turlar", value: "28", icon: Calendar, color: "from-orange-500 to-orange-600" },
    { label: "Aylık Gelir", value: "$185K", icon: DollarSign, color: "from-purple-500 to-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-950/50 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 fixed h-screen z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-white text-sm">Diogenes</h1>
                <p className="text-xs text-slate-400">Travel Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: "overview", icon: Home, label: "Genel Bakış", color: "from-blue-500 to-blue-600" },
            {
              id: "reservations",
              icon: Calendar,
              label: "Rezervasyonlar",
              color: "from-green-500 to-green-600",
            },
            {
              id: "vouchers",
              icon: Ticket,
              label: "Voucher Oluştur",
              color: "from-orange-500 to-orange-600",
            },
            { id: "guests", icon: Users, label: "Konuk Yönetimi", color: "from-purple-500 to-purple-600" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                  : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50 space-y-3">
          {sidebarOpen && (
            <div className="p-3 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
              <p className="text-xs text-slate-400 mb-1">Oturum Açık:</p>
              <p className="text-sm font-semibold text-white">{user.name}</p>
            </div>
          )}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">Rezervasyon Yönetimi</h2>
                <p className="text-sm text-slate-400">Tüm tur ve otel rezervasyonlarını yönetin</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
              <Plus size={18} />
              Yeni Rezervasyon
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/80 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    >
                      <stat.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Reservations Table */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Aktif Rezervasyonlar</h3>
                <div className="flex items-center gap-2">
                  <Search size={18} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Ara..."
                    className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Rezervasyon ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Tur Adı</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Otel</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Tarih</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Pax</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Gelir</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Rehber</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Durum</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res, idx) => (
                      <tr key={idx} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-white">{res.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{res.tourName}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{res.hotel}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{res.dates}</td>
                        <td className="px-6 py-4 text-sm font-medium text-blue-400">{res.pax}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-400">{res.revenue}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{res.guide}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              res.status === "Confirmed"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors text-slate-400 hover:text-slate-200">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// ==================== AIRCRAFT DASHBOARD ====================
function AircraftDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const flights = [
    {
      id: "FLT-001",
      aircraft: "Airbus A320",
      registration: "TC-JFA",
      route: "Istanbul → Antalya",
      departure: "14:30",
      arrival: "16:00",
      capacity: 180,
      booked: 156,
      status: "On Time",
    },
    {
      id: "FLT-002",
      aircraft: "Boeing 737",
      registration: "TC-JGB",
      route: "Istanbul → Bodrum",
      departure: "16:45",
      arrival: "18:15",
      capacity: 189,
      booked: 145,
      status: "On Time",
    },
    {
      id: "FLT-003",
      aircraft: "Airbus A321",
      registration: "TC-JGC",
      route: "Ankara → İzmir",
      departure: "10:00",
      arrival: "11:30",
      capacity: 220,
      booked: 198,
      status: "Delayed",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-950/50 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 fixed h-screen z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Plane size={24} className="text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-white text-sm">Diogenes</h1>
                <p className="text-xs text-slate-400">Travel Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", icon: Home, label: "Genel Bakış", color: "from-orange-500 to-orange-600" },
            { id: "flights", icon: Plane, label: "Uçuşlar", color: "from-orange-500 to-orange-600" },
            { id: "aircraft", icon: Plane, label: "Uçak Listesi", color: "from-orange-500 to-orange-600" },
            { id: "manifest", icon: FileText, label: "Manifest", color: "from-orange-500 to-orange-600" },
          ].map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>

      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 flex flex-col`}>
        <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">Uçak Operasyonları</h2>
                <p className="text-sm text-slate-400">Uçaklar, uçuşlar ve manifesto yönetimi</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white mb-4">Bugünün Uçuşları</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Uçuş ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Uçak</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Tescil</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Rota</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Kalkış</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">İniş</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Doluluk</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight, idx) => (
                      <tr key={idx} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-white">{flight.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{flight.aircraft}</td>
                        <td className="px-6 py-4 text-sm font-mono text-blue-400">{flight.registration}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{flight.route}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{flight.departure}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{flight.arrival}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-700/50 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full"
                                style={{ width: `${(flight.booked / flight.capacity) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-slate-300">
                              {flight.booked}/{flight.capacity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              flight.status === "On Time"
                                ? "bg-green-500/20 text-green-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {flight.status}
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
      </main>
    </div>
  )
}

// ==================== OPERATIONS DASHBOARD ====================
function OperationsDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-950/50 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 fixed h-screen z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
              <BarChart3 size={24} className="text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-white text-sm">Diogenes</h1>
                <p className="text-xs text-slate-400">Travel Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", icon: Home, label: "Genel Bakış", color: "from-green-500 to-green-600" },
            { id: "kpis", icon: BarChart3, label: "KPI'lar", color: "from-green-500 to-green-600" },
            { id: "reports", icon: FileText, label: "Raporlar", color: "from-green-500 to-green-600" },
            { id: "logs", icon: Clock, label: "Aktivite Logs", color: "from-green-500 to-green-600" },
          ].map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>

      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 flex flex-col`}>
        <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">Operasyon Yönetimi</h2>
                <p className="text-sm text-slate-400">KPI'lar, raporlar ve sistem monitörlü</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Sistem Uptime", value: "99.8%", icon: CheckCircle, color: "from-green-500 to-green-600" },
                { label: "Aktif İşlemler", value: "247", icon: Clock, color: "from-blue-500 to-blue-600" },
                { label: "Hata Oranı", value: "0.2%", icon: AlertTriangle, color: "from-red-500 to-red-600" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}
                  >
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-6">Son Etkinlikler</h3>
              <div className="space-y-4">
                {[
                  { time: "14:32", action: "Yeni rezervasyon oluşturuldu", user: "Ahmet Y." },
                  { time: "14:28", action: "Uçak manifestosu güncellendi", user: "Mehmet K." },
                  { time: "14:15", action: "Sistem yedeklemesi tamamlandı", user: "Sistem" },
                  { time: "14:02", action: "Kullanıcı erişim izni değiştirildi", user: "Admin" },
                ].map((log, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/50 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{log.action}</p>
                      <p className="text-xs text-slate-400">{log.user}</p>
                    </div>
                    <p className="text-xs text-slate-400">{log.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// ==================== MANAGEMENT DASHBOARD ====================
function ManagementDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const users = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@diogenestravel.com", role: "Uçak Müdürü", status: "Active" },
    { id: 2, name: "Meryem Demir", email: "meryem@diogenestravel.com", role: "Rehber", status: "Active" },
    { id: 3, name: "Mehmet Kaya", email: "mehmet@diogenestravel.com", role: "Operasyon", status: "Active" },
    { id: 4, name: "Zeynep Şimşek", email: "zeynep@diogenestravel.com", role: "Rezervasyon", status: "Inactive" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-950/50 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300 fixed h-screen z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Users size={24} className="text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-white text-sm">Diogenes</h1>
                <p className="text-xs text-slate-400">Travel Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", icon: Home, label: "Genel Bakış", color: "from-purple-500 to-purple-600" },
            { id: "users", icon: Users, label: "Kullanıcı Yönetimi", color: "from-purple-500 to-purple-600" },
            { id: "reports", icon: BarChart3, label: "Raporlar", color: "from-purple-500 to-purple-600" },
            { id: "settings", icon: Settings, label: "Sistem Ayarları", color: "from-purple-500 to-purple-600" },
          ].map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-white transition-all"
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>

      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 flex flex-col`}>
        <header className="bg-slate-950/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-30">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-white">Yönetim Paneli</h2>
                <p className="text-sm text-slate-400">Sistem ve kullanıcı yönetimi</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2">
              <Plus size={18} />
              Yeni Kullanıcı
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-bold text-white">Sistem Kullanıcıları</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Ad Soyad</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Rol</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400">Durum</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-white">{u.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{u.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{u.role}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              u.status === "Active" ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-300"
                            }`}
                          >
                            {u.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors text-slate-400 hover:text-slate-200">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// ==================== LOGIN PAGE ====================
export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<any>(null)

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      newErrors.email = "Email boş olamaz"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Geçerli bir email girin"
    }

    if (!password.trim()) {
      newErrors.password = "Şifre boş olamaz"
    } else if (password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalı"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const mockUsers = [
      {
        email: "reservation@diogenestravel.com",
        password: "reservation123",
        role: "Reservation",
        name: "Rezervasyon Departmanı",
        department: "reservation",
      },
      {
        email: "ucak@diogenestravel.com",
        password: "uçak123",
        role: "Aircraft",
        name: "Uçak Departmanı",
        department: "aircraft",
      },
      {
        email: "operations@diogenestravel.com",
        password: "operations123",
        role: "Operations",
        name: "Operasyon Departmanı",
        department: "operations",
      },
      {
        email: "management@diogenestravel.com",
        password: "management123",
        role: "Management",
        name: "Yönetim Departmanı",
        department: "management",
      },
      {
        email: "admin@diogenestravel.com",
        password: "admin123",
        role: "Admin",
        name: "Admin Kullanıcı",
        department: "management",
      },
    ]

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
      setLoggedInUser(user)
      setIsLoggedIn(true)
    } else {
      setErrors({ email: "Email veya şifre yanlış" })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoggedInUser(null)
    setEmail("")
    setPassword("")
    setErrors({})
    localStorage.removeItem("user")
  }

  if (isLoggedIn && loggedInUser) {
    if (loggedInUser.department === "reservation") {
      return <ReservationsDashboard user={loggedInUser} onLogout={handleLogout} />
    } else if (loggedInUser.department === "aircraft") {
      return <AircraftDashboard user={loggedInUser} onLogout={handleLogout} />
    } else if (loggedInUser.department === "operations") {
      return <OperationsDashboard user={loggedInUser} onLogout={handleLogout} />
    } else {
      return <ManagementDashboard user={loggedInUser} onLogout={handleLogout} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20 blur-3xl animate-glow"
        style={{
          background: "conic-gradient(from 0deg, #3B82F6, #F97316, #22C55E, #3B82F6)",
        }}
      />

      <div
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: "conic-gradient(from 180deg, #22C55E, #F97316, #3B82F6, #22C55E)",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Diogenes Travel Portal"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Diogenes Travel Portal</h1>
            <p className="text-slate-600 text-sm">Seyahat Yönetim Sistemi</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Giriş Yap</h2>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email / Kullanıcı Adı</label>
              <input
                type="email"
                placeholder="example@diogenestravel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                  errors.email
                    ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500/20"
                    : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                }`}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none pr-12 ${
                    errors.password
                      ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
              <span className="text-sm text-slate-600">Beni hatırla</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Giriş Yap
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">© 2025 Diogenes Travel. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}

// Dashboard component used after successful login
function Dashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Hoş geldiniz, {user.name}</p>
        </div>
        <button
          onClick={onLogout}
          className="mx-auto block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  )
}
