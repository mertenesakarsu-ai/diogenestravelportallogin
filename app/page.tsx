"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Menu,
  X,
  LogOut,
  BarChart3,
  Users,
  Plane,
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  MapPin,
  DollarSign,
  ArrowUpRight,
} from "lucide-react"

function ModernDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState("overview")

  const departmentConfig: Record<string, any> = {
    reservation: {
      title: "Rezervasyon Yönetimi",
      color: "from-blue-500 to-blue-600",
      icon: Calendar,
      metrics: [
        { label: "Aktif Rezervasyon", value: "2,847", change: "+12%", trend: "up", icon: CheckCircle2 },
        { label: "Bekleme Listesi", value: "423", change: "+5%", trend: "up", icon: Clock },
        { label: "İptal Oranı", value: "3.2%", change: "-2%", trend: "down", icon: TrendingDown },
        { label: "Gelir", value: "$185.2K", change: "+23%", trend: "up", icon: DollarSign },
      ],
    },
    aircraft: {
      title: "Uçak Yönetimi",
      color: "from-orange-500 to-orange-600",
      icon: Plane,
      metrics: [
        { label: "Kayıtlı Uçak", value: "156", change: "+8%", trend: "up", icon: Plane },
        { label: "Aktif Uçak", value: "142", change: "+3%", trend: "up", icon: CheckCircle2 },
        { label: "Bakım Yapılan", value: "14", change: "-1%", trend: "down", icon: TrendingDown },
        { label: "Verimlilik", value: "94.5%", change: "+4%", trend: "up", icon: TrendingUp },
      ],
    },
    operations: {
      title: "Operasyon Yönetimi",
      color: "from-green-500 to-green-600",
      icon: BarChart3,
      metrics: [
        { label: "Planlanan Seferler", value: "423", change: "+15%", trend: "up", icon: MapPin },
        { label: "Tamamlanan", value: "412", change: "+12%", trend: "up", icon: CheckCircle2 },
        { label: "Geciken Seferler", value: "11", change: "-5%", trend: "down", icon: TrendingDown },
        { label: "Memnuniyet", value: "4.8/5", change: "+0.3", trend: "up", icon: TrendingUp },
      ],
    },
    management: {
      title: "Yönetim Paneli",
      color: "from-purple-500 to-purple-600",
      icon: Users,
      metrics: [
        { label: "Toplam Kullanıcı", value: "5,234", change: "+12%", trend: "up", icon: Users },
        { label: "Aktif Oturumlar", value: "842", change: "+8%", trend: "up", icon: CheckCircle2 },
        { label: "Sistem Uptime", value: "99.8%", change: "+0.1%", trend: "up", icon: TrendingUp },
        { label: "Aylık Gelir", value: "$245.6K", change: "+18%", trend: "up", icon: DollarSign },
      ],
    },
  }

  const config = departmentConfig[user.department] || departmentConfig.management

  const chartData = [
    { month: "Ocak", value: 65, target: 75 },
    { month: "Şub", value: 78, target: 75 },
    { month: "Mar", value: 72, target: 75 },
    { month: "Nisan", value: 85, target: 75 },
    { month: "Mayıs", value: 92, target: 75 },
    { month: "Haziran", value: 88, target: 75 },
    { month: "Temmuz", value: 95, target: 75 },
    { month: "Ağu", value: 87, target: 75 },
    { month: "Eyl", value: 91, target: 75 },
    { month: "Eki", value: 84, target: 75 },
    { month: "Kas", value: 89, target: 75 },
    { month: "Ara", value: 96, target: 75 },
  ]

  const maxValue = Math.max(...chartData.map((d) => Math.max(d.value, d.target)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-900/5 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-card/80 backdrop-blur-md border-r border-border transition-all duration-300 fixed h-screen z-40 flex flex-col shadow-xl`}
      >
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg flex-shrink-0`}
            >
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <h1 className="font-bold text-foreground text-sm leading-tight">Diogenes</h1>
                <p className="text-xs text-muted-foreground">Travel Portal</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: "overview", icon: BarChart3, label: "Genel Bakış" },
            { id: "analytics", icon: TrendingUp, label: "Analitics" },
            { id: "schedule", icon: Calendar, label: "Takvim" },
            { id: "reports", icon: BarChart3, label: "Raporlar" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50 space-y-3">
          {sidebarOpen && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-accent/50 to-accent/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Oturum Açık:</p>
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors text-sm font-medium"
            title={!sidebarOpen ? "Çıkış Yap" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Çıkış Yap</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "ml-72" : "ml-20"} transition-all duration-300 flex flex-col`}>
        {/* Top Header */}
        <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-30 shadow-sm">
          <div className="px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{config.title}</h2>
                <p className="text-sm text-muted-foreground">Hoş geldiniz, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-lg bg-accent text-sm font-medium text-foreground">🇹🇷 Türkçe</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-foreground mb-2">Bugünün Özeti</h3>
              <p className="text-muted-foreground">
                Departmanınıza ait tüm metrikler ve performans göstergeleri aşağıda sunulmaktadır.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {config.metrics.map((metric: any, idx: number) => {
                const Icon = metric.icon
                const isPositive = metric.trend === "up"
                return (
                  <div
                    key={idx}
                    className="bg-card border border-border/50 rounded-2xl p-6 hover:border-border hover:shadow-lg transition-all duration-300 group cursor-pointer backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon size={28} className="text-white" />
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}
                      >
                        {isPositive ? <ArrowUpRight size={16} /> : <TrendingDown size={16} />}
                        {metric.change}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">{metric.label}</p>
                    <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                  </div>
                )
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-card border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Aylık Performans Trendi</h3>
                    <p className="text-sm text-muted-foreground">Son 12 ayın verileri</p>
                  </div>
                  <select className="px-4 py-2 rounded-lg bg-accent text-foreground text-sm font-medium border border-border/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                    <option>Son 12 Ay</option>
                    <option>Son 6 Ay</option>
                    <option>Son 3 Ay</option>
                  </select>
                </div>

                <div className="h-80 flex items-end justify-between gap-2 px-2 py-6 bg-gradient-to-b from-blue-50/30 to-blue-50/10 dark:from-blue-950/20 dark:to-blue-950/5 rounded-xl border border-blue-200/20 dark:border-blue-800/20">
                  {chartData.map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full flex flex-col items-center gap-1">
                        {/* Target Line */}
                        <div
                          className="w-full bg-gradient-to-t from-orange-400/40 to-orange-300/20 rounded-t opacity-60 transition-all hover:opacity-100"
                          style={{
                            height: `${(data.target / maxValue) * 100}%`,
                            minHeight: "2px",
                          }}
                        />
                        {/* Value Bar */}
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 via-blue-400 to-blue-300 rounded-t transition-all duration-200 hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 hover:shadow-lg"
                          style={{
                            height: `${(data.value / maxValue) * 100}%`,
                            minHeight: "12px",
                          }}
                        />
                      </div>
                      <div className="text-xs font-semibold text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-start gap-6 mt-6 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-400" />
                    <span className="text-sm text-muted-foreground">Gerçek Değer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-300" />
                    <span className="text-sm text-muted-foreground">Hedef</span>
                  </div>
                </div>
              </div>

              {/* Right Column Stats */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-6 hover:shadow-lg transition-all backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}
                    >
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Performans Hedefi</p>
                  <p className="text-3xl font-bold text-foreground">92%</p>
                  <p className="text-xs text-green-600 font-semibold mt-3">↑ Hedefi aştı</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border border-purple-200/50 dark:border-purple-800/50 rounded-2xl p-6 hover:shadow-lg transition-all backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">Memnuniyet Oranı</p>
                  <p className="text-3xl font-bold text-foreground">4.8/5</p>
                  <p className="text-xs text-green-600 font-semibold mt-3">↑ Çok İyi</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 hover:shadow-lg transition-all backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Sistem Durumu</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-sm font-bold text-green-600">Optimum</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="text-center text-xs text-muted-foreground">
              <p>Son güncelleme: Bugün saat 14:30 • © 2025 Diogenes Travel Portal</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "", form: "" })
  const [loggedInUser, setLoggedInUser] = useState<any>(null)

  const mockUsers = [
    {
      email: "admin@diogenestravel.com",
      password: "admin123",
      role: "admin",
      name: "Sistem Yöneticisi",
      department: "management",
    },
    {
      email: "reservation@diogenestravel.com",
      password: "reservation123",
      role: "user",
      name: "Rezervasyon Sorumlusu",
      department: "reservation",
    },
    {
      email: "aircraft@diogenestravel.com",
      password: "aircraft123",
      role: "user",
      name: "Uçak Yöneticisi",
      department: "aircraft",
    },
    {
      email: "operations@diogenestravel.com",
      password: "operations123",
      role: "user",
      name: "Operasyon Müdürü",
      department: "operations",
    },
    {
      email: "ucak@diogenestravel.com",
      password: "uçak123",
      role: "user",
      name: "Uçak Yöneticisi",
      department: "aircraft",
    },
    {
      email: "management@diogenestravel.com",
      password: "management123",
      role: "user",
      name: "Yönetim Müdürü",
      department: "management",
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = { email: "", password: "", form: "" }
    let isValid = true

    if (!formData.email.trim()) {
      newErrors.email = "Email alanı boş olamaz"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir email adresi girin"
      isValid = false
    }

    if (!formData.password.trim()) {
      newErrors.password = "Şifre alanı boş olamaz"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const user = mockUsers.find((u) => u.email === formData.email && u.password === formData.password)

      if (!user) {
        setErrors((prev) => ({ ...prev, form: "Email veya şifre hatalı" }))
        setIsLoading(false)
        return
      }

      setLoggedInUser({
        id: Math.random().toString(36).substr(2, 9),
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department,
      })
    }, 800)
  }

  if (loggedInUser) {
    return <ModernDashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-background flex flex-col">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border border-border/50 backdrop-blur-sm p-8">
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-orange-500 to-green-500 p-0.5 shadow-xl animate-glow">
                  <div className="relative w-full h-full bg-background rounded-full flex items-center justify-center">
                    <Image
                      src="/images/logo.png"
                      alt="Diogenes Travel Portal"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Diogenes Travel Portal</h1>
              <p className="text-muted-foreground text-sm font-medium">Seyahat Yönetim Sistemi</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Giriş Yap</h2>
              <p className="text-muted-foreground text-sm">Kullanıcı bilgilerinizi girin</p>
            </div>

            {errors.form && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle size={16} />
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email / Kullanıcı Adı
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@diogenestravel.com"
                    className={`w-full px-4 py-3 pl-4 bg-background border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.email ? "border-red-500 focus:ring-red-500/50" : "border-input focus:ring-blue-500/50"
                    }`}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 bg-background border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      errors.password ? "border-red-500 focus:ring-red-500/50" : "border-input focus:ring-blue-500/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={16} />
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-input bg-background cursor-pointer accent-blue-500"
                  />
                  <span className="text-muted-foreground">Beni hatırla</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Kontrol ediliyor...
                  </>
                ) : (
                  <>
                    Giriş Yap
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            © 2025 Diogenes Travel Portal. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </main>
  )
}
