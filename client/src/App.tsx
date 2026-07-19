import { useEffect, useState } from 'react'
import './App.css'

type HealthState = {
  status: string
  message?: string
}

function App() {
  const [health, setHealth] = useState<HealthState | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const response = await fetch('/api/health')
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }
        const data = (await response.json()) as HealthState
        setHealth(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to reach the API')
      }
    }

    void loadHealth()
  }, [])

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">React + Vite + Express</p>
        <h1>Secure web app foundation</h1>
        <p className="lead">
          This starter now includes a polished frontend, a backend health endpoint,
          and a safer local development setup for future expansion.
        </p>

        <div className="status-panel" role="status" aria-live="polite">
          {error ? (
            <p className="status-error">API unavailable: {error}</p>
          ) : health ? (
            <>
              <p className="status-ok">Backend status: {health.status}</p>
              {health.message ? <p>{health.message}</p> : null}
            </>
          ) : (
            <p>Checking API connection…</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
