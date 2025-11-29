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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        setErrors({ ...errors, password: data.error || "Email veya şifre yanlış" })
        return
      }

      const data = await response.json()

      // Store auth data
      localStorage.setItem("auth_token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
      }

      // Role-based redirect
      const { role, department } = data.user
      if (role === "admin") {
        window.location.href = "/admin/dashboard"
      } else if (department === "travel_agent") {
        window.location.href = "/dashboard"
      } else {
        window.location.href = `/dashboard/${department}`
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ ...errors, password: "Giriş işlemi başarısız oldu" })
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Map Background - like in the image */}
      <div className="absolute inset-0 bg-white">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mapLines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Orange paths - more prominent */}
              <path d="M0,80 Q50,60 100,80 T200,80" fill="none" stroke="#fb923c" strokeWidth="3" opacity="0.85" />
              <path d="M20,120 Q70,100 120,120 T220,120" fill="none" stroke="#fb923c" strokeWidth="2.5" opacity="0.75" />
              <path d="M-20,50 Q30,30 80,50 T180,50" fill="none" stroke="#fdba74" strokeWidth="2" opacity="0.65" />
              <path d="M10,150 Q60,170 110,150 T210,150" fill="none" stroke="#fb923c" strokeWidth="2" opacity="0.7" />
              
              {/* Blue paths - more prominent */}
              <path d="M0,100 Q50,120 100,100 T200,100" fill="none" stroke="#60a5fa" strokeWidth="3" opacity="0.85" />
              <path d="M30,140 Q80,160 130,140 T230,140" fill="none" stroke="#60a5fa" strokeWidth="2.5" opacity="0.75" />
              <path d="M-10,70 Q40,90 90,70 T190,70" fill="none" stroke="#93c5fd" strokeWidth="2" opacity="0.65" />
              <path d="M15,30 Q65,10 115,30 T215,30" fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.7" />
              
              {/* Cyan/Turquoise paths */}
              <path d="M10,60 Q60,40 110,60 T210,60" fill="none" stroke="#22d3ee" strokeWidth="2.5" opacity="0.8" />
              <path d="M40,100 Q90,80 140,100 T240,100" fill="none" stroke="#67e8f9" strokeWidth="2" opacity="0.7" />
              <path d="M-5,180 Q45,160 95,180 T195,180" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.65" />
              
              {/* Green paths */}
              <path d="M0,130 Q50,150 100,130 T200,130" fill="none" stroke="#4ade80" strokeWidth="2.5" opacity="0.8" />
              <path d="M25,170 Q75,190 125,170 T225,170" fill="none" stroke="#86efac" strokeWidth="2" opacity="0.7" />
              <path d="M-15,110 Q35,130 85,110 T185,110" fill="none" stroke="#bbf7d0" strokeWidth="2" opacity="0.6" />
              <path d="M5,40 Q55,60 105,40 T205,40" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.65" />
              
              {/* Location pins - bigger */}
              <circle cx="80" cy="80" r="5" fill="#fb923c" opacity="0.9" />
              <circle cx="150" cy="100" r="4.5" fill="#60a5fa" opacity="0.85" />
              <circle cx="120" cy="130" r="5" fill="#4ade80" opacity="0.85" />
              <circle cx="50" cy="120" r="4" fill="#22d3ee" opacity="0.8" />
              <circle cx="170" cy="60" r="4" fill="#fb923c" opacity="0.75" />
              <circle cx="30" cy="150" r="3.5" fill="#60a5fa" opacity="0.75" />
              
              {/* Plane icons - bigger and more visible */}
              <g transform="translate(100, 70) rotate(45)" opacity="0.75">
                <path d="M0,-5 L3,0 L0,2 L-3,0 Z" fill="#fb923c" />
              </g>
              <g transform="translate(140, 140) rotate(-30)" opacity="0.7">
                <path d="M0,-5 L3,0 L0,2 L-3,0 Z" fill="#60a5fa" />
              </g>
              <g transform="translate(65, 145) rotate(15)" opacity="0.65">
                <path d="M0,-5 L3,0 L0,2 L-3,0 Z" fill="#4ade80" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapLines)" />
        </svg>
        
        {/* Lighter gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-200/50 p-8">
          {/* Logo with colored circle */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28 mb-3">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-orange-500 to-green-500 shadow-md"></div>
              <div className="absolute inset-[3px] rounded-full bg-white flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Diogenes Logo"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-contain"
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

            <div className="relative rounded-xl transition-all duration-300 p-[2px] bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:via-orange-500 hover:to-green-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5),0_0_15px_rgba(249,115,22,0.3),0_0_15px_rgba(34,197,94,0.3)] group">
              <button
                type="submit"
                className="w-full py-4 bg-black text-white font-bold text-lg rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              >
                Giriş Yap
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">© 2025 Diogenes Travel. Tüm hakları saklıdır.</p>
      </div>
    </div>
  )
}
