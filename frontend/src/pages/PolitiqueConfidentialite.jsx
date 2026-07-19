import { Link } from 'react-router-dom'

function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-14 md:px-20">
      <div className="max-w-3xl mx-auto">
        <span className="font-['Bebas_Neue'] text-[22px] tracking-[0.08em] text-white mb-10 block">
          GYM<span className="text-[#FF5500]">FLOW</span>
        </span>

        <h1 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide mb-8">
          Politique de confidentialité
        </h1>

        <div className="space-y-6 text-white/70 text-[14px] leading-relaxed font-['Inter']">
          <section>
            <h2 className="text-white text-lg font-semibold mb-2 font-['Inter']">Données collectées</h2>
            <p>Lors de votre inscription, nous collectons votre nom, votre adresse email et un mot de passe (stocké de façon chiffrée, jamais en clair). Aucune autre donnée personnelle n'est demandée.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2 font-['Inter']">Finalité du traitement</h2>
            <p>Ces données sont utilisées uniquement pour la gestion de votre compte, de vos abonnements et des notifications liées à votre activité sur GymFlow.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2 font-['Inter']">Destinataires et sous-traitants</h2>
            <p>Vos données peuvent transiter par nos prestataires techniques : hébergement (Render), envoi d'emails transactionnels (Mailtrap), et supervision technique des erreurs (Sentry, configuré pour ne pas collecter vos données personnelles par défaut).</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2 font-['Inter']">Vos droits</h2>
            <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez modifier votre nom et votre mot de passe directement depuis votre espace membre. Pour toute demande de suppression complète de compte, contactez l'administrateur.</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-2 font-['Inter']">Conservation des données</h2>
            <p>Vos données sont conservées pendant toute la durée de votre inscription active sur la plateforme.</p>
          </section>
        </div>

        <Link to="/register" className="inline-block mt-10 text-[#FF5500] font-semibold no-underline hover:underline font-['Inter'] text-sm">
          ← Retour à l'inscription
        </Link>
      </div>
    </div>
  )
}

export default PolitiqueConfidentialite