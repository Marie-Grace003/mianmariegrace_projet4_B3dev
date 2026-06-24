import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Email ou mot de passe incorrect.')
        return
      }
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch {
      setError('Impossible de contacter le serveur.')
    }
  }

  return (
    <div className="auth-page">

      {/* Côté image */}
      <div className="auth-image">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          alt="Salle de sport GymFlow"
        />
        <div className="auth-image-overlay" />
        <div className="auth-image-content">
          <p className="auth-image-quote">
            Chaque séance te rapproche<br />
            de ta <span>meilleure version.</span>
          </p>
          <p className="auth-image-sub">GymFlow — Ton espace fitness, toujours avec toi.</p>
        </div>
      </div>

      {/* Côté formulaire */}
      <div className="auth-form-side">
        <div className="auth-form-inner">

          <span className="auth-logo">GYM<span>FLOW</span></span>

          <h1>Connexion</h1>
          <span className="auth-subtitle">Accède à ton espace membre</span>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn">Se connecter</button>
          </form>

          <p className="auth-link">
            Pas encore de compte ? <Link to="/register">S'inscrire</Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login
