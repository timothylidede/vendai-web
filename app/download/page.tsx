export default function DownloadPage() {
  const winUrl = '/api/download/win'
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#111111] dark:text-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold">Get VendAI POS</h1>
        <p className="mt-2 text-sm md:text-base opacity-80">Choose the best experience for your needs</p>

        {/* Web App Option */}
        <div className="mt-6 md:mt-8">
          <a
            className="block rounded-xl p-5 md:p-6 bg-gradient-to-br from-red-500 via-green-400 to-red-500 text-white hover:opacity-95 transition group"
            href="https://app.vendai.digital"
          >
            <div className="text-lg md:text-xl font-bold mb-2">🌐 Use Web App (Recommended)</div>
            <div className="text-xs md:text-sm opacity-90 mb-3">Start immediately in your browser • Always up-to-date • No installation required</div>
            <div className="text-xs opacity-80 bg-white/10 rounded-lg p-2.5 md:p-3">
              <strong>Perfect for:</strong> Quick access, shared computers, instant updates, cloud-based workflow
            </div>
          </a>
        </div>

        {/* Desktop App Options */}
        <div className="mt-5 md:mt-6">
          <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4 opacity-90">Or Download Desktop App</h2>
          <div className="grid gap-3 md:gap-4">
            <a
              className="block rounded-xl p-4 md:p-5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:opacity-95 transition"
              href={winUrl}
            >
              <div className="text-base md:text-lg font-semibold">💻 Windows Desktop (EXE)</div>
              <div className="text-xs opacity-80 mt-1.5 md:mt-2">Offline access • Native OS integration • Auto-updates</div>
            </a>

            <a
              className="block rounded-xl p-4 md:p-5 bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:opacity-95 transition"
              href={winUrl}
            >
              <div className="text-base md:text-lg font-semibold">📦 Windows Desktop (ZIP)</div>
              <div className="text-xs opacity-80 mt-1.5 md:mt-2">If .exe is blocked: unzip and run VendAI-POS-Windows-Setup.exe inside</div>
            </a>
          </div>
        </div>

        {/* Installation Guide */}
        <div className="mt-8 md:mt-10 rounded-xl border border-gray-200/30 p-4 md:p-6 bg-gray-50 dark:bg-white/5">
          <h2 className="text-lg md:text-xl font-semibold">Desktop Installation Guide (Windows)</h2>
          <ol className="mt-3 list-decimal pl-4 md:pl-5 space-y-1.5 md:space-y-2 text-xs md:text-sm">
            <li>Click Download. If your browser shows a warning, confirm to continue.</li>
            <li>Double‑click the installer.</li>
            <li>If you see "Windows protected your PC", click More info → Run anyway.</li>
            <li>Finish the wizard. Shortcuts are created in Start menu and optionally Desktop.</li>
            <li>Launch VendAI POS from the Start menu.</li>
          </ol>

          <div className="mt-5 md:mt-6 p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-sm md:text-base text-blue-900 dark:text-blue-100">💡 Pro Tip</h3>
            <p className="text-xs md:text-sm text-blue-800 dark:text-blue-200 mt-1">
              Try the web app first at <strong>app.vendai.digital</strong> - it's faster to access and always has the latest features. Download desktop only if you need offline access.
            </p>
          </div>

          <div className="mt-3 md:mt-4 text-xs md:text-sm opacity-80">
            <strong>Troubleshooting:</strong> If downloads are blocked, try a different browser (Edge/Chrome/Firefox) or network. Corporate networks may require IT approval for .exe files.
          </div>
        </div>
      </div>
    </div>
  )
}
