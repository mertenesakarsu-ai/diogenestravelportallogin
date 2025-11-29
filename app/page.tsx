"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email boş olamaz"
    } else if (!email.includes("@")) {
      newErrors.email = "Geçerli bir email girin"
    }

    if (!password) {
      newErrors.password = "Şifre boş olamaz"
    } else if (password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalı"
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors)
      return
    }

    // Mock authentication
    const mockUsers: { [key: string]: any } = {
      "reservation@diogenestravel.com": {
        name: "Rezervasyon Departmanı",
        role: "reservation",
        email: "reservation@diogenestravel.com",
      },
      "ucak@diogenestravel.com": {
        name: "Uçak Departmanı",
        role: "aircraft",
        email: "ucak@diogenestravel.com",
      },
      "operations@diogenestravel.com": {
        name: "Operasyon Departmanı",
        role: "operations",
        email: "operations@diogenestravel.com",
      },
      "management@diogenestravel.com": {
        name: "Yönetim Departmanı",
        role: "management",
        email: "management@diogenestravel.com",
      },
    }

    if (mockUsers[email] && password.endsWith("123")) {
      setUser(mockUsers[email])
      setIsLoggedIn(true)
      localStorage.setItem("user", JSON.stringify(mockUsers[email]))
      setErrors({ email: "", password: "" })
    } else {
      setErrors({ email: "", password: "Email veya şifre yanlış" })
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setEmail("")
    setPassword("")
    localStorage.removeItem("user")
  }

  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100 text-center">
            <div className="inline-block w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mb-6">
              <span className="text-3xl text-white">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Giriş Başarılı!</h1>
            <p className="text-slate-600 mb-4">{user.name}</p>
            <p className="text-sm text-slate-500 mb-8">{user.email}</p>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <p className="text-sm text-slate-700">
                <strong>Not:</strong> Departman paneli henüz geliştirilme aşamasındadır. Tarafından eklendi.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all active:scale-95"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-gradient-to-r from-blue-400 via-orange-400 to-green-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
            </div>
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
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
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
