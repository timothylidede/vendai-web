import { NextResponse } from 'next/server'

export async function GET() {
  const serverOnly = process.env.WIN_EXE_URL || '(unset)'
  const publicVar = process.env.NEXT_PUBLIC_WIN_EXE_URL || '(unset)'
  const chosen = (process.env.WIN_EXE_URL || process.env.NEXT_PUBLIC_WIN_EXE_URL) || '(unset)'
  return NextResponse.json({
    WIN_EXE_URL: serverOnly,
    NEXT_PUBLIC_WIN_EXE_URL: publicVar,
    chosen,
    note: 'Redirect prefers WIN_EXE_URL, then NEXT_PUBLIC_WIN_EXE_URL. If both are unset, /api/download/win returns 503.'
  })
}
