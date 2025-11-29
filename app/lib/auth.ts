import jwt from "jsonwebtoken"

export interface UserPayload {
  id: string
  email: string
  role: string
  department: string
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret"

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" })
}

export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload
    return decoded
  } catch (error) {
    return null
  }
}

export const DEPARTMENTS = {
  ADMIN: "admin",
  TRAVEL_AGENT: "travel_agent",
  RESERVATION: "reservation",
  AIRCRAFT: "aircraft",
  OPERATIONS: "operations",
  MANAGEMENT: "management",
} as const

export const DEPARTMENT_LABELS = {
  admin: "Yönetici",
  travel_agent: "Travel Agent",
  reservation: "Rezarvasyon Departmanı",
  aircraft: "Uçak Departmanı",
  operations: "Operasyon Departmanı",
  management: "Yönetim Departmanı",
} as const

export const PERMISSIONS = {
  admin: ["read_all", "write_all", "delete_all", "manage_users"],
  travel_agent: ["read_own_groups", "write_own_groups", "view_hotels", "create_vouchers"],
  reservation: ["read_reservations", "write_reservations", "view_flights"],
  aircraft: ["read_aircraft", "write_aircraft", "manage_maintenance"],
  operations: ["read_operations", "write_operations", "manage_schedules"],
  management: ["read_reports", "view_analytics", "manage_departments"],
} as const
