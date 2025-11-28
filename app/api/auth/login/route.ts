import { connectToDatabase } from "@/app/lib/mongodb"
import { generateToken } from "@/app/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email ve şifre gereklidir" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const usersCollection = db.collection("users")

    // Find user
    const user = await usersCollection.findOne({ email })

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Email veya şifre yanlış" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      department: user.department,
    })

    const response = NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          department: user.department,
        },
      },
      { status: 200 },
    )

    // Set token as httpOnly cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Giriş işlemi başarısız oldu" }, { status: 500 })
  }
}
