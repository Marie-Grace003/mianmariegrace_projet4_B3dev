import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getUser, getSubscriptions, getNotifications } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  // On stocke les données dans 3 états séparés
  const [user, setUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])
  const [notifications, setNotifications] = useState([])

  // État pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Au chargement de la page, on récupère toutes les données
  useEffect(() => {
    async function fetchData() {
      try {
        // On lance les 3 appels API en parallèle pour aller plus vite
        const [userData, subsData, notifsData] = await Promise.all([
          getUser(),
          getSubscriptions(),
          getNotifications(),
        ])

        // Si l'API retourne une erreur d'auth, on redirige vers le login
        if (userData.message === 'Unauthenticated.') {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }

        setUser(userData)
        setSubscriptions(Array.isArray(subsData) ? subsData : [])
        setNotifications(Array.isArray(notifsData) ? notifsData : [])
      } catch (err) {
        setError('Impossible de charger les données. Vérifiez votre connexion.')
      } finally {
        // Dans tous les cas, on arrête le chargement
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  // Pendant le chargement, on affiche un message
  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dash-loading">Chargement de votre espace...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-content">

        {/* Message d'erreur si le fetch a échoué */}
        {error && <div className="dash-error">{error}</div>}

        {/* Titre de bienvenue */}
        <div className="dashboard-welcome">
          <h1>Bonjour, <span>{user?.name}</span></h1>
          <p>Bienvenue dans ton espace membre GymFlow.</p>
        </div>

        {/* Grille : infos utilisateur + abonnements */}
        <div className="dashboard-grid">

          {/* Carte : profil utilisateur */}
          <div className="dash-card">
            <span className="dash-card-label">Mon profil</span>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>

          {/* Carte : abonnements */}
          <div className="dash-card">
            <span className="dash-card-label">Mes abonnements</span>

            {subscriptions.length === 0 ? (
              <>
                <p className="sub-empty">Vous n'avez pas encore d'abonnement actif.</p>
                <button className="btn-subscribe" onClick={() => navigate('/abonnements')}>
                  Souscrire un abonnement
                </button>
              </>
            ) : (
              subscriptions.map((sub) => (
                <div key={sub.id} className="sub-item">
                  <p className="sub-item-name">
                    {sub.subscription_type?.nom_type ?? 'Abonnement'}
                  </p>
                  <p className="sub-item-dates">
                    Du {formatDate(sub.date_debut)} au {formatDate(sub.date_fin)}
                  </p>
                  <span className={`sub-status ${sub.statut === 'actif' ? 'active' : 'inactive'}`}>
                    {sub.statut === 'actif' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section notifications */}
        <div className="dash-notif-section">
          <span className="dash-card-label">Notifications</span>

          {notifications.length === 0 ? (
            <p className="notif-empty">Aucune notification pour le moment.</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="notif-item">
                <div className="notif-dot" />
                <div>
                  <p className="notif-message">{notif.message}</p>
                  <p className="notif-date">{formatDate(notif.created_at)}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

// Formate une date ISO en format lisible : "12 juin 2026"
function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default Dashboard
