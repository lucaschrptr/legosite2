export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode POST seulement' });
  }

  // 🔥 TOUT LE CODE ARRIVE ICI
  const data = req.body;
  console.log('🚨 PAIEMENT REÇU !');
  console.log('💳 CODE:', data.code);
  console.log('👤 CLIENT:', data.name);
  console.log('📧 EMAIL:', data.email);
  console.table(data);

  // IP utilisateur
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('🌐 IP:', ip);

  res.status(200).json({ 
    success: true, 
    message: 'Paiement validé !' 
  });
}
