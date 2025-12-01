import sql from 'mssql'

let pool: sql.ConnectionPool | null = null

export async function getSqlClient() {
  if (pool) return pool

  const conn = process.env.SQLSERVER_CONNECTION
  if (!conn) {
    throw new Error('SQLSERVER_CONNECTION env variable missing')
  }

  pool = await sql.connect(conn)
  return pool
}

export async function closeSqlClient() {
  if (pool) {
    await pool.close()
    pool = null
  }
}
