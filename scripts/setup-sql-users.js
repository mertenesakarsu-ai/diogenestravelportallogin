const sql = require('mssql')

const users = [
  {
    email: 'admin@diogenestravel.com',
    password: 'admin123',
    name: 'Admin Kullanıcı',
    role: 'Admin',
    department: 'Admin',
  },
  {
    email: 'agent@diogenestravel.com',
    password: 'agent123',
    name: 'Travel Agent',
    role: 'Travel Agent',
    department: 'Travel Agent',
  },
  {
    email: 'reservation@diogenestravel.com',
    password: 'res123',
    name: 'Rezervasyon Departmanı',
    role: 'Rezervasyon Departmanı',
    department: 'Rezervasyon Departmanı',
  },
  {
    email: 'flight@diogenestravel.com',
    password: 'flight123',
    name: 'Uçak Departmanı',
    role: 'Uçak Departmanı',
    department: 'Uçak Departmanı',
  },
]

async function ensureUsersTable(pool) {
  const createTableSql = `
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
    BEGIN
      CREATE TABLE Users (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Email NVARCHAR(255) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(255) NOT NULL,
        DisplayName NVARCHAR(255) NOT NULL,
        RoleName NVARCHAR(100) NOT NULL,
        Department NVARCHAR(100) NOT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSDATETIME()
      )
    END
  `

  await pool.request().query(createTableSql)
}

async function upsertUser(pool, user) {
  const request = pool.request()
  request.input('Email', sql.NVarChar, user.email)
  request.input('PasswordHash', sql.NVarChar, user.password)
  request.input('DisplayName', sql.NVarChar, user.name)
  request.input('RoleName', sql.NVarChar, user.role)
  request.input('Department', sql.NVarChar, user.department)

  const upsertSql = `
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email)
    BEGIN
      UPDATE Users
      SET PasswordHash = @PasswordHash,
          DisplayName = @DisplayName,
          RoleName = @RoleName,
          Department = @Department
      WHERE Email = @Email
    END
    ELSE
    BEGIN
      INSERT INTO Users (Email, PasswordHash, DisplayName, RoleName, Department)
      VALUES (@Email, @PasswordHash, @DisplayName, @RoleName, @Department)
    END
  `

  await request.query(upsertSql)
}

async function main() {
  const connectionString = process.env.SQLSERVER_CONNECTION

  if (!connectionString) {
    console.error('❌ SQLSERVER_CONNECTION environment variable not set.')
    process.exit(1)
  }

  let pool

  try {
    console.log('🔌 SQL Server bağlantısı kuruluyor...')
    pool = await sql.connect(connectionString)
    const testResult = await pool.request().query('SELECT GETDATE() AS serverTime')
    console.log('✅ Bağlantı testi başarılı:', testResult.recordset[0].serverTime)

    console.log('🛠️  Users tablosu kontrol ediliyor...')
    await ensureUsersTable(pool)

    for (const user of users) {
      await upsertUser(pool, user)
      console.log(`👤 Kullanıcı hazırlandı: ${user.email}`)
    }

    console.log('\n🎉 SQL Server login kullanıcıları oluşturuldu / güncellendi:')
    users.forEach((user) => {
      console.log(` - ${user.email} / ${user.password} (${user.role})`)
    })
  } catch (err) {
    console.error('❌ SQL işlemi sırasında hata oluştu:', err)
    process.exitCode = 1
  } finally {
    if (pool) {
      await pool.close()
    }
  }
}

main()

