"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { LogOut, Home } from "lucide-react"
import Image from "next/image"

interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
}

const DEPARTMENT_INFO = {
  reservation: {
    name: "Rezarvasyon Departmanı",
    color: "blue",
    icon: "🎫",
    features: ["Rezervasyon Yönetimi", "Müşteri Bilgileri", "Ödeme İşlemleri", "Raporlar"],
  },
  aircraft: {
    name: "Uçak Departmanı",
    color: "orange",
    icon: "✈️",
    features: ["Uçak Envanteri", "Bakım Zamanlaması", "Teknik Raporlar", "Muayene Kayıtları"],
  },
  operations: {
    name: "Operasyon Departmanı",
    color: "green",
    icon: "⚙️",
    features: ["Uçuş Planlaması", "Rota Yönetimi", "Personel Görevlendirmesi", "İstatistikler"],
  },
  management: {
    name: "Yönetim Departmanı",
    color: "purple",
    icon: "📊",
    features: ["Bütçe Yönetimi", "KPI Analizi", "Strateji Planlama", "Karar Desteği"],
  },
} as const

export default function DepartmentDashboard() {
  const router = useRouter()
  const params = useParams()
  const department = params.department as string
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/")
      return
    }

    try {
      const userData = JSON.parse(storedUser)
      if (userData.department !== department) {
        router.push("/")
        return
      }
      setUser(userData)
    } catch (error) {
      router.push("/")
    } finally {
      setIsLoading(false)
    }
  }, [router, department])

  const handleLogout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const deptInfo = DEPARTMENT_INFO[department as keyof typeof DEPARTMENT_INFO]

  if (isLoading || !deptInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{deptInfo.name}</h1>
              <p className="text-xs text-muted-foreground">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="px-3 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium flex items-center gap-2 transition-colors"
            >
              <Home size={18} />
              Ana Sayfa
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium flex items-center gap-2 transition-colors"
            >
              <LogOut size={18} />
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="text-4xl mb-4">{deptInfo.icon}</div>
          <h2 className="text-3xl font-bold text-foreground mb-2">{deptInfo.name}</h2>
          <p className="text-muted-foreground">
            {user?.name} olarak bu departmana atanmış görevleriniz ve özellikleri aşağıda görebilirsiniz.
          </p>
        </div>

        {/* Department Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deptInfo.features.map((feature) => (
            <div
              key={feature}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-xl">{deptInfo.icon}</span>
              </div>
              <h3 className="font-semibold text-foreground">{feature}</h3>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Aktif Görevler</p>
            <p className="text-3xl font-bold text-foreground">12</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Tamamlanan</p>
            <p className="text-3xl font-bold text-foreground">48</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-muted-foreground text-sm mb-2">Bu Ay Performansı</p>
            <p className="text-3xl font-bold text-foreground">%92</p>
          </div>
        </div>
      </main>
    </div>
  )
}
