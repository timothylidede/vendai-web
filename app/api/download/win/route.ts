import { NextResponse } from 'next/server'

const DEFAULT_WIN_EXE_URL = 'https://drive.google.com/uc?export=download&id=15B6fW5iCB7zrciaGV29miSvFZBCGWtJO'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_WIN_EXE_URL || DEFAULT_WIN_EXE_URL
  // Temporary redirect so future changes don’t cache aggressively
  return NextResponse.redirect(url, { status: 307 })
}
