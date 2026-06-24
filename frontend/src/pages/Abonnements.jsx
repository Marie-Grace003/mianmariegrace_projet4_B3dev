import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getSubscriptionTypes, createSubscription } from '../services/api'
import './Abonnements.css'

function Abonnements() {
  const navigate = useNavigate()

  const fallback = [
    { id: 1, nom_type: 'ESSENTIEL', prix: 29, duree_jours: 30, description: 'Accès salle · Vestiaires' },
    { id: 2, nom_type: 'PREMIUM',   prix: 49, duree_jours: 30, description: 'Accès illimité · Tous les cours · Coaching personnalisé' },
    { id: 3, nom_type: 'ÉTUDIANT',  prix: 19, duree_jours: 30, description: 'Accès hors-pic · Tarif réduit' },
  ]

  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Charger les types d'abonnements disponibles
  useEffect(() => {
    getSubscriptionTypes()
      .then(data => {
        // Si l'API renvoie un tableau non vide on l'utilise, sinon on affiche le fallback
        setTypes(Array.isArray(data) && data.length > 0 ? data : fallback)
        setLoading(false)
      })
      .catch(() => {
        setTypes(fallback)
        setLoading(false)
      })
  }, [])

  // Souscrire à un abonnement
  const handleSubscribe = async (typeId) => {
    setSubmitting(true)
    setError('')
    try {
      const res = await createSubscription({ type_id: typeId })

      // L'API retourne un message d'erreur si quelque chose s'est mal passé
      if (res.errors || res.message === 'Unauthenticated.') {
        const firstError = Object.values(res.errors || {})[0]?.[0] || res.message
        setError(firstError || 'Une erreur est survenue.')
        return
      }

      // Succès — on redirige vers le dashboard
      navigate('/dashboard')
    } catch {
      setError('Impossible de contacter le serveur.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="abonnements-page">
      <Navbar />

      <div className="abonnements-content">

        {/* Retour au dashboard */}
        <button className="abonnements-back" onClick={() => navigate('/dashboard')}>
          ← Retour à mon espace
        </button>

        {/* En-tête */}
        <div className="abonnements-header">
          <span>Rejoins GymFlow</span>
          <h1>Choisis ton abonnement</h1>
          <p>Sans engagement. Résilie quand tu veux.</p>
        </div>

        {/* Message d'erreur */}
        {error && <div className="abonnements-error">{error}</div>}

        {/* Cartes */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            Chargement...
          </p>
        ) : (
          <div className="abonnements-grid">
            {types.map((type, index) => {
              const isFeatured = index === 1

              return (
                <div key={type.id} className={`abo-card ${isFeatured ? 'featured' : ''}`}>

                  <span className="abo-card-name">{type.nom_type}</span>

                  <div className="abo-card-price">{type.prix}€</div>
                  <span className="abo-card-duration">pour {type.duree_jours} jours</span>

                  <hr className="abo-card-sep" />

                  {type.description && (
                    <p className="abo-card-desc">{type.description}</p>
                  )}

                  <button
                    className={`abo-btn ${isFeatured ? 'abo-btn-featured' : 'abo-btn-default'}`}
                    onClick={() => handleSubscribe(type.id)}
                    disabled={submitting}
                  >
                    {submitting ? 'En cours...' : 'Rejoindre'}
                  </button>

                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default Abonnements
