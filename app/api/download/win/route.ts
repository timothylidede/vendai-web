import { NextResponse } from 'next/server'

const DEFAULT_WIN_EXE_URL = 'https://drive.google.com/uc?export=download&id=15B6fW5iCB7zrciaGV29miSvFZBCGWtJO'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_WIN_EXE_URL || DEFAULT_WIN_EXE_URL
  const res = NextResponse.redirect(url, 307)
  // Prevent caches from sticking to an old redirect target
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.headers.set('Pragma', 'no-cache')
  res.headers.set('Expires', '0')
  return res
}
