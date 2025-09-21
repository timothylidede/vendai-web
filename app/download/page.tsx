export default function DownloadPage() {
  const winUrl = '/api/download/win'
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-[#111111] dark:text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold">Download VendAI POS</h1>
        <p className="mt-2 text-sm opacity-70">Windows installer</p>

        <div className="mt-8 grid gap-4">
          <a
            className="block rounded-xl p-5 bg-gradient-to-br from-blue-600 to-indigo-600 text-white hover:opacity-95 transition"
            href={winUrl}
          >
            <div className="text-lg font-semibold">🪟 Download for Windows (EXE)</div>
            <div className="text-xs opacity-80 mt-2">If your browser or network asks for confirmation, proceed to download.</div>
          </a>

          <a
            className="block rounded-xl p-5 bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:opacity-95 transition"
            href={winUrl}
          >
            <div className="text-lg font-semibold">📦 Alternate Download (ZIP)</div>
            <div className="text-xs opacity-80 mt-2">If .exe is blocked, use the ZIP: unzip and run VendAI-POS-Windows-Setup.exe inside.</div>
          </a>
        </div>

        <div className="mt-10 rounded-xl border border-gray-200/30 p-6 bg-gray-50 dark:bg-white/5">
          <h2 className="text-xl font-semibold">Installation steps (Windows)</h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm">
            <li>Click Download. If your browser shows a warning, confirm to continue.</li>
            <li>Double‑click the installer.</li>
            <li>If you see "Windows protected your PC", click More info → Run anyway.</li>
            <li>Finish the wizard. Shortcuts are created in Start menu and optionally Desktop.</li>
            <li>Launch VendAI POS from the Start menu.</li>
          </ol>

          <div className="mt-4 text-sm opacity-80">
            Tip: Some networks block direct .exe files. Try a different browser (Edge/Chrome/Firefox) or another network.
          </div>
        </div>
      </div>
    </div>
  )
}
