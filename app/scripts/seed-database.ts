import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = process.env.DB_NAME || "DiogenesLOG"

async function seedDatabase() {
  const client = new MongoClient(uri as string)

  try {
    await client.connect()
    const db = client.db(dbName)

    // Create collections
    const usersCollection = db.collection("users")
    const departmentsCollection = db.collection("departments")

    // Seed departments
    await departmentsCollection.deleteMany({})
    await departmentsCollection.insertMany([
      { name: "Rezarvasyon Departmanı", code: "reservation", color: "#3B82F6" },
      { name: "Uçak Departmanı", code: "aircraft", color: "#F97316" },
      { name: "Operasyon Departmanı", code: "operations", color: "#10B981" },
      { name: "Yönetim Departmanı", code: "management", color: "#8B5CF6" },
    ])

    // Seed users
    await usersCollection.deleteMany({})
    await usersCollection.insertMany([
      {
        email: "admin@diogenestravel.com",
        password: "admin123", // Note: In production, use bcrypt
        name: "Admin Kullanıcı",
        role: "admin",
        department: "admin",
        createdAt: new Date(),
      },
      {
        email: "reservation@diogenestravel.com",
        password: "reservation123",
        name: "Rezarvasyon Müdürü",
        role: "department_head",
        department: "reservation",
        createdAt: new Date(),
      },
      {
        email: "aircraft@diogenestravel.com",
        password: "aircraft123",
        name: "Uçak Müdürü",
        role: "department_head",
        department: "aircraft",
        createdAt: new Date(),
      },
      {
        email: "operations@diogenestravel.com",
        password: "operations123",
        name: "Operasyon Müdürü",
        role: "department_head",
        department: "operations",
        createdAt: new Date(),
      },
      {
        email: "management@diogenestravel.com",
        password: "management123",
        name: "Yönetim Müdürü",
        role: "department_head",
        department: "management",
        createdAt: new Date(),
      },
    ])

    console.log("✅ Database seeding completed successfully!")
    console.log("\n📝 Test Credentials:")
    console.log("├─ Admin: admin@diogenestravel.com / admin123")
    console.log("├─ Rezarvasyon: reservation@diogenestravel.com / reservation123")
    console.log("├─ Uçak: aircraft@diogenestravel.com / aircraft123")
    console.log("├─ Operasyon: operations@diogenestravel.com / operations123")
    console.log("└─ Yönetim: management@diogenestravel.com / management123")
  } finally {
    await client.close()
  }
}

seedDatabase().catch(console.error)
