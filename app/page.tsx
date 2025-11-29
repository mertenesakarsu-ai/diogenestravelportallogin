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
  LogOut,
  BarChart3,
  Users,
  Plane,
  Calendar,
  Settings,
} from "lucide-react"

function AdminDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const departments = [
    { id: "reservation", name: "Rezervasyon", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { id: "aircraft", name: "Uçak", icon: Plane, color: "from-orange-500 to-orange-600" },
    { id: "operations", name: "Operasyon", icon: BarChart3, color: "from-green-500 to-green-600" },
    { id: "management", name: "Yönetim", icon: Users, color: "from-purple-500 to-purple-600" },
  ]

  const stats = [
    { label: "Toplam Rezervasyon", value: "2,847", change: "+12%" },
    { label: "Aktif Uçak", value: "156", change: "+5%" },
    { label: "Planlanan Seferler", value: "423", change: "+8%" },
    { label: "Toplam Gelir", value: "$185.2K", change: "+23%" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-card border-r border-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DT</span>
            </div>
            {sidebarOpen && <span className="font-bold text-foreground">Diogenes</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", label: "Genel Bakış", icon: BarChart3 },
            { id: "departments", label: "Departmanlar", icon: Users },
            { id: "analytics", label: "Analitikler", icon: BarChart3 },
            { id: "settings", label: "Ayarlar", icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Çıkış Yap</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu size={20} className="text-foreground" />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground">
                {user.role === "admin" ? "Sistem Yöneticisi" : user.department}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Hoş geldiniz, {user.name}!</h1>
                <p className="text-muted-foreground">Sisteme giriş yaptınız. Departmanları yönetebilirsiniz.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-lg p-6">
                    <p className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-green-600 text-sm font-medium mt-2">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {departments.map((dept) => {
                  const Icon = dept.icon
                  return (
                    <div
                      key={dept.id}
                      className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center`}
                        >
                          <Icon size={32} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground">Departmanı yönet</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === "departments" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Departmanlar</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept) => {
                  const Icon = dept.icon
                  return (
                    <div key={dept.id} className="bg-card border border-border rounded-lg p-6">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${dept.color} flex items-center justify-center mb-4`}
                      >
                        <Icon size={24} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{dept.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">Departman yönetim sistemi</p>
                      <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                        Ayrıntılar
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Analitikler</h1>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground">Detaylı analiz ve raporlar burada gösterilecektir.</p>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Ayarlar</h1>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-muted-foreground">Sistem ayarlarını buradan yönetebilirsiniz.</p>
              </div>
            </div>
          )}
        </div>
      </div>
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
    return <AdminDashboard user={loggedInUser} onLogout={() => setLoggedInUser(null)} />
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
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-orange-500 to-green-500 p-0.5 shadow-xl">
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
