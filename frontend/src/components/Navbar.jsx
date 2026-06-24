import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/api'

function Navbar() {
  const navigate = useNavigate()
  const isAuth = !!localStorage.getItem('token')

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-[#0a0a0a] sticky top-0 z-50 px-8 py-4 flex items-center justify-between border-b border-white/5">
      <Link to="/" className="font-['Bebas_Neue'] text-xl tracking-widest text-white">
        GYM<span className="text-[#FF5500]">FLOW</span>
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        <li><Link to="/" className="text-white/50 font-['Inter'] text-sm hover:text-white transition-colors">Accueil</Link></li>
        <li><a href="/#abonnements" className="text-white/50 font-['Inter'] text-sm hover:text-white transition-colors">Abonnements</a></li>
        <li><a href="/#apropos" className="text-white/50 font-['Inter'] text-sm hover:text-white transition-colors">À propos</a></li>
      </ul>

      <div className="flex gap-3 items-center">
        {isAuth ? (
          <>
            <Link to="/dashboard" className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors px-3 py-2">
              Mon espace
            </Link>
            <button onClick={handleLogout} className="px-5 py-2 bg-[#FF5500] text-white rounded-full font-['Inter'] text-sm font-medium hover:bg-orange-600 transition-colors">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors px-3 py-2">
              Connexion
            </Link>
            <Link to="/register" className="px-5 py-2 bg-[#FF5500] text-white rounded-full font-['Inter'] text-sm font-medium hover:bg-orange-600 transition-colors">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
