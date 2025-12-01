import { NextResponse } from 'next/server'
import { getSqlClient } from '@/lib/db/sql'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const pool = await getSqlClient()
    const result = await pool.request().query('SELECT GETDATE() AS serverTime')
    return NextResponse.json({ ok: true, time: result.recordset[0].serverTime })
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || 'Unknown SQL error',
      },
      { status: 500 }
    )
  }
}
