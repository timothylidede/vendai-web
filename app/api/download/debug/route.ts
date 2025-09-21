import { NextResponse } from 'next/server'

export async function GET() {
  const val = process.env.NEXT_PUBLIC_WIN_EXE_URL || '(unset)'
  return NextResponse.json({ NEXT_PUBLIC_WIN_EXE_URL: val })
}
