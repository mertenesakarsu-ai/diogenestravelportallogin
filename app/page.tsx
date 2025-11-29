"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const validateForm = () => {
    const newErrors = { email: "", password: "" }

    if (!email.trim()) {
      newErrors.email = "Email boş olamaz"
    } else if (!email.includes("@")) {
      newErrors.email = "Geçerli bir email girin"
    }

    if (!password) {
      newErrors.password = "Şifre boş olamaz"
    } else if (password.length < 3) {
      newErrors.password = "Şifre en az 3 karakter olmalı"
    }

    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Mock login
    const mockUsers: { [key: string]: string } = {
      "reservation@diogenestravel.com": "reservation123",
      "ucak@diogenestravel.com": "uçak123",
      "operations@diogenestravel.com": "operations123",
      "management@diogenestravel.com": "management123",
    }

    if (mockUsers[email] === password) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
      }
      alert(`Hoş geldiniz! ${email}`)
      setEmail("")
      setPassword("")
    } else {
      setErrors({ ...errors, password: "Email veya şifre yanlış" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* Logo with colored circle */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28 mb-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-orange-500 to-green-500 shadow-md"></div>
              <div className="absolute inset-[3px] rounded-full bg-white flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Diogenes Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 text-center mb-0.5">Diogenes Travel Portal</h1>
            <p className="text-slate-500 text-center text-sm">Seyahat Yönetim Sistemi</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email / Kullanıcı Adı
              </label>
              <div
                className={`relative rounded-lg transition-all duration-300 ${emailFocused ? "p-[2px] bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 shadow-[0_0_15px_rgba(59,130,246,0.5),0_0_15px_rgba(249,115,22,0.3),0_0_15px_rgba(34,197,94,0.3)]" : "p-0"}`}
              >
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="ornek@diogenestravel.com"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : emailFocused
                          ? "border-transparent bg-white"
                          : "border-slate-300 bg-white"
                    }`}
                  />
                  {errors.email && <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-500" />}
                </div>
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Şifre
              </label>
              <div
                className={`relative rounded-lg transition-all duration-300 ${passwordFocused ? "p-[2px] bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 shadow-[0_0_15px_rgba(59,130,246,0.5),0_0_15px_rgba(249,115,22,0.3),0_0_15px_rgba(34,197,94,0.3)]" : "p-0"}`}
              >
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="••••••••"
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-colors outline-none ${
                      errors.password
                        ? "border-red-500 bg-red-50"
                        : passwordFocused
                          ? "border-transparent bg-white"
                          : "border-slate-300 bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-orange-500 border-slate-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-600">
                Beni hatırla
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 via-orange-500 to-green-500 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4),0_0_20px_rgba(249,115,22,0.3),0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
            >
              Giriş Yap
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">© 2025 Diogenes Travel. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}
