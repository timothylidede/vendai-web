export const dynamic = 'force-dynamic'

type GithubRelease = {
  tag_name: string
  published_at: string
  assets: Array<{
    name: string
    browser_download_url: string
    size: number
    content_type?: string
  }>
}

async function getLatestRelease(): Promise<GithubRelease | null> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/timothylidede/vendai-pos/releases/latest',
      {
        cache: 'no-store',
        headers: { 'Accept': 'application/vnd.github+json' },
      }
    )
    if (!res.ok) return null
    return (await res.json()) as GithubRelease
  } catch {
    return null
  }
}

function formatSize(bytes: number) {
  if (!bytes) return '—'
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let n = bytes
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(1)} ${units[i]}`
}

export default async function DownloadPage() {
  const release = await getLatestRelease()

  const assets = release?.assets ?? []
  const exe = assets.find(a => a.name.endsWith('.exe'))
  const zip = assets.find(a => a.name.toLowerCase().endsWith('.zip'))

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#111111] dark:text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">Download VendAI POS</h1>
        {release ? (
          <p className="mt-2 text-sm opacity-70">
            Version {release.tag_name} • Released {new Date(release.published_at).toLocaleDateString()}
          </p>
        ) : (
          <p className="mt-2 text-sm opacity-70">Latest version</p>
        )}

        <div className="mt-8 grid gap-4">
          {exe ? (
            <a
              className="block rounded-xl p-5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:opacity-95 transition"
              href={exe.browser_download_url}
              download={exe.name}
            >
              <div className="text-lg font-semibold">🪟 Download for Windows (EXE)</div>
              <div className="text-sm opacity-90 mt-1">{exe.name} • {formatSize(exe.size)}</div>
              <div className="text-xs opacity-80 mt-2">If your browser or network blocks .exe files, use the ZIP option below.</div>
            </a>
          ) : (
            <div className="rounded-xl p-5 border border-gray-200/30 bg-gray-50 dark:bg-white/5">
              <div className="font-semibold">Windows installer not found</div>
              <div className="text-sm opacity-80">Check the latest release on GitHub or try the ZIP option below.</div>
            </div>
          )}

          {zip ? (
            <a
              className="block rounded-xl p-5 bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:opacity-95 transition"
              href={zip.browser_download_url}
              download={zip.name}
            >
              <div className="text-lg font-semibold">📦 Alternate Download (ZIP)</div>
              <div className="text-sm opacity-90 mt-1">{zip.name} • {formatSize(zip.size)}</div>
              <div className="text-xs opacity-80 mt-2">Unzip and run VendAI-POS-Windows-Setup.exe inside. This helps when .exe downloads are blocked.</div>
            </a>
          ) : null}
        </div>

        <div className="mt-10 rounded-xl border border-gray-200/30 p-6 bg-gray-50 dark:bg-white/5">
          <h2 className="text-xl font-semibold">Installation steps (Windows)</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm">
            <li>Download the installer (.exe) or the ZIP alternative.</li>
            <li>Double‑click the installer. If you see "Windows protected your PC", click More info → Run anyway.</li>
            <li>Choose an install location (no admin needed). Default is your user folder.</li>
            <li>Finish the wizard. Shortcuts are created in Start menu and optionally Desktop.</li>
            <li>Launch VendAI POS from the Start menu.</li>
          </ol>

          <div className="mt-4 text-sm opacity-80">
            Tip: If your browser shows "Failed – Unknown server error" when downloading the .exe, try the ZIP link above, a different browser (Edge/Chrome/Firefox), or another network. Some networks block direct .exe files.
          </div>
        </div>

        <div className="mt-6 text-sm opacity-80">
          Can’t see the assets? Visit the release page directly:{' '}
          <a className="underline" href="https://github.com/timothylidede/vendai-pos/releases/latest" target="_blank">GitHub Releases</a>
        </div>
      </div>
    </div>
  )
}
