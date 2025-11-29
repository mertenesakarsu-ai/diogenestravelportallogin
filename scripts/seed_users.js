const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://DiogenesLog:2srYFJLLUFP0JMVr@diogenesmongo.dvqupka.mongodb.net/?appName=DiogenesMongo";
const dbName = "DiogenesLOG";

const users = [
  {
    email: "admin@diogenes.com",
    password: "admin123",
    name: "Admin Kullanıcı",
    role: "admin",
    department: "admin"
  },
  {
    email: "agent@diogenes.com",
    password: "agent123",
    name: "Travel Agent",
    role: "user",
    department: "travel_agent"
  },
  {
    email: "reservation@diogenes.com",
    password: "res123",
    name: "Rezervasyon Kullanıcı",
    role: "user",
    department: "reservation"
  },
  {
    email: "flight@diogenes.com",
    password: "flight123",
    name: "Uçak Departmanı",
    role: "user",
    department: "aircraft"
  }
];

async function seedUsers() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("MongoDB'ye bağlandı");
    
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    
    // Clear existing users
    await usersCollection.deleteMany({});
    console.log("Mevcut kullanıcılar temizlendi");
    
    // Insert new users
    const result = await usersCollection.insertMany(users);
    console.log(`${result.insertedCount} kullanıcı eklendi`);
    
    // List all users
    const allUsers = await usersCollection.find({}).toArray();
    console.log("\n=== Eklenen Kullanıcılar ===");
    allUsers.forEach(user => {
      console.log(`Email: ${user.email} | Şifre: ${user.password} | Rol: ${user.role} | Departman: ${user.department}`);
    });
    
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    await client.close();
  }
}

seedUsers();
