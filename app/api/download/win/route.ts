import { NextResponse } from 'next/server'

export async function GET() {
  // Prefer a server-only env var; fall back to the public var for backward compatibility
  const configured = process.env.WIN_EXE_URL || process.env.NEXT_PUBLIC_WIN_EXE_URL

  // Fail fast if not configured to avoid silently redirecting to an old default
  if (!configured) {
    const res = NextResponse.json(
      { error: 'WIN_EXE_URL not configured on server' },
      { status: 503 }
    )
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.headers.set('Pragma', 'no-cache')
    res.headers.set('Expires', '0')
    return res
  }

  // Minimal server log to help verify target in server logs
  try {
    console.log('[download] Redirecting to', configured)
  } catch {}

  const res = NextResponse.redirect(configured, 307)
  // Prevent caches from sticking to an old redirect target
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.headers.set('Pragma', 'no-cache')
  res.headers.set('Expires', '0')
  return res
}
