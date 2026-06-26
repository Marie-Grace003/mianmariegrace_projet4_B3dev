<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; }
    .header { background: #0a0a0a; padding: 32px; text-align: center; }
    .logo { font-size: 28px; font-weight: 900; letter-spacing: 4px; color: #fff; }
    .logo span { color: #FF5500; }
    .body { padding: 32px; }
    .body h2 { color: #0a0a0a; margin-top: 0; }
    .body p { color: #444; line-height: 1.6; }
    .badge { display: inline-block; background: #FF5500; color: #fff; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px; margin: 8px 0; }
    .detail { background: #f9f9f9; border-radius: 6px; padding: 16px; margin: 20px 0; }
    .detail p { margin: 4px 0; color: #333; font-size: 14px; }
    .footer { background: #0a0a0a; padding: 16px; text-align: center; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo">GYM<span>FLOW</span></div>
    </div>
    <div class="body">
      <h2>Votre abonnement est actif !</h2>
      <p>Bonjour <strong>{{ $subscription->user->name }}</strong>,</p>
      <p>Nous confirmons l'activation de votre abonnement :</p>

      <div class="detail">
        <p><strong>Formule :</strong> <span class="badge">{{ $subscription->subscriptionType->nom_type }}</span></p>
        <p><strong>Début :</strong> {{ \Carbon\Carbon::parse($subscription->date_debut)->format('d/m/Y') }}</p>
        <p><strong>Fin :</strong> {{ \Carbon\Carbon::parse($subscription->date_fin)->format('d/m/Y') }}</p>
        <p><strong>Statut :</strong> Actif</p>
      </div>

      <p>Tu peux accéder à ton espace membre à tout moment depuis GymFlow.</p>
      <p>À très bientôt en salle,<br><strong>L'équipe GymFlow</strong></p>
    </div>
    <div class="footer">
      © {{ date('Y') }} GymFlow — Tous droits réservés
    </div>
  </div>
</body>
</html>
