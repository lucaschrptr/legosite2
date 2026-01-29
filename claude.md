# BrickShop - Documentation

Site vitrine pour la vente de sets LEGO, créé en HTML, CSS et JavaScript vanilla.

---

## 🚀 Ouvrir le site

1. **Méthode simple** : Double-cliquez sur le fichier `index.html` pour l'ouvrir dans votre navigateur par défaut.

2. **Avec VS Code** : Installez l'extension "Live Server", puis cliquez droit sur `index.html` → "Open with Live Server".

3. **Avec un serveur local** (optionnel) :
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (avec npx)
   npx serve
   ```
   Puis ouvrez `http://localhost:8000` dans votre navigateur.

---

## 📦 Modifier la liste des produits

Les produits sont définis directement dans le fichier `index.html`, dans la section `<section id="produits">`.

### Structure d'une carte produit

```html
<article class="product-card">
    <div class="product-image">
        <img src="URL_IMAGE" alt="Description de l'image">
        <span class="product-badge">Populaire</span> <!-- Optionnel -->
    </div>
    <div class="product-info">
        <h3 class="product-title">Nom du Produit</h3>
        <p class="product-description">
            Description courte du produit (1-2 phrases).
        </p>
        <div class="product-footer">
            <span class="product-price">99,99 €</span>
            <a href="#contact" class="btn btn-secondary">Commander</a>
        </div>
    </div>
</article>
```

### Ajouter un nouveau produit

1. Copiez le bloc `<article class="product-card">...</article>` ci-dessus
2. Collez-le dans la `<div class="products-grid">` dans `index.html`
3. Modifiez les valeurs (image, titre, description, prix)

### Badges disponibles

- `<span class="product-badge">Populaire</span>` → Badge rouge
- `<span class="product-badge new">Nouveau</span>` → Badge bleu
- `<span class="product-badge">Best-seller</span>` → Badge rouge

Pour supprimer le badge, retirez simplement la ligne `<span class="product-badge">...</span>`.

---

## 📱 Modifier le numéro WhatsApp

Le numéro WhatsApp apparaît à **2 endroits** dans `index.html` :

### 1. Bouton flottant (en bas à droite)

Cherchez cette ligne vers la fin du fichier :

```html
<a href="https://wa.me/33612345678?text=..."
```

### 2. Bouton dans la section Contact

Cherchez cette ligne dans la section `#contact` :

```html
<a href="https://wa.me/33612345678?text=..."
```

### Format du numéro

- **Format** : `https://wa.me/[INDICATIF][NUMERO]`
- **Sans** le `+` devant l'indicatif
- **Sans** le `0` au début du numéro
- **Sans** espaces ni tirets

#### Exemples :

| Pays | Numéro local | Format WhatsApp |
|------|--------------|-----------------|
| France | 06 12 34 56 78 | `33612345678` |
| Belgique | 0471 23 45 67 | `32471234567` |
| Suisse | 076 123 45 67 | `41761234567` |

### Message pré-rempli (optionnel)

Le paramètre `?text=...` permet de pré-remplir un message :

```
https://wa.me/33612345678?text=Bonjour,%20je%20suis%20intéressé(e)%20par%20vos%20sets%20LEGO
```

Les espaces doivent être encodés en `%20`.

---

## 🎨 Adapter les couleurs

Toutes les couleurs sont définies comme **variables CSS** au début du fichier `styles.css` :

```css
:root {
    --color-primary: #E3000B;       /* Rouge LEGO - Boutons, accents */
    --color-secondary: #FFD500;     /* Jaune LEGO - Hero, boutons secondaires */
    --color-accent: #0055BF;        /* Bleu LEGO - Badges "Nouveau" */
    --color-white: #FFFFFF;
    --color-light: #F5F5F5;         /* Fond gris clair */
    --color-gray: #E0E0E0;
    --color-dark: #333333;          /* Texte foncé, footer */
    --color-text: #444444;          /* Texte standard */
    --color-whatsapp: #25D366;      /* Vert WhatsApp */
}
```

### Changer une couleur

Remplacez simplement la valeur hexadécimale. Par exemple, pour un rouge plus foncé :

```css
--color-primary: #B8000A;
```

### Palette LEGO officielle (référence)

| Couleur | Hex |
|---------|-----|
| Rouge LEGO | `#E3000B` |
| Jaune LEGO | `#FFD500` |
| Bleu LEGO | `#0055BF` |
| Vert LEGO | `#00852B` |
| Orange LEGO | `#FF6D00` |
| Noir LEGO | `#1B1B1B` |

---

## 🔤 Changer la police

### Police actuelle : Poppins

La police est chargée via Google Fonts dans `index.html` :

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Changer pour une autre police

1. Allez sur [Google Fonts](https://fonts.google.com/)
2. Choisissez une police et copiez le lien `<link>`
3. Remplacez le lien dans `index.html`
4. Modifiez la variable dans `styles.css` :

```css
--font-family: 'NouvellePolice', sans-serif;
```

### Polices recommandées

| Police | Style |
|--------|-------|
| Poppins | Moderne, arrondi |
| Inter | Clean, professionnel |
| Montserrat | Élégant, géométrique |
| Open Sans | Lisible, neutre |
| Roboto | Standard Google |

---

## 📁 Structure du projet

```
site-lego/
├── index.html      # Page principale
├── styles.css      # Styles CSS
├── script.js       # JavaScript (animations, interactions)
└── claude.md       # Cette documentation
```

---

## 🛠️ Personnalisations avancées

### Changer le logo

Le logo est un emoji + texte. Pour utiliser une image :

```html
<!-- Avant -->
<a href="#accueil" class="logo">
    <span class="logo-icon">🧱</span>
    BrickShop
</a>

<!-- Après -->
<a href="#accueil" class="logo">
    <img src="votre-logo.png" alt="BrickShop" height="40">
</a>
```

### Ajouter des images locales

1. Créez un dossier `images/` dans le projet
2. Placez vos images dedans
3. Référencez-les ainsi :

```html
<img src="images/nom-produit.jpg" alt="Description">
```

### Modifier les liens sociaux

Dans le footer, cherchez :

```html
<div class="footer-social">
    <a href="#" aria-label="Facebook" class="social-link">📘</a>
    <a href="#" aria-label="Instagram" class="social-link">📷</a>
    <a href="#" aria-label="Twitter" class="social-link">🐦</a>
</div>
```

Remplacez `#` par vos URLs de réseaux sociaux.

---

## ❓ FAQ

**Q: Les animations ne fonctionnent pas ?**
R: Vérifiez que JavaScript est activé dans votre navigateur. Ouvrez la console (F12) pour voir les erreurs éventuelles.

**Q: Le site n'est pas responsive ?**
R: Le site est conçu pour être responsive. Si vous avez ajouté du contenu, vérifiez qu'il n'y a pas de largeurs fixes trop grandes.

**Q: Comment ajouter plus de pages ?**
R: Créez un nouveau fichier HTML (ex: `a-propos.html`), copiez la structure de base de `index.html`, et ajoutez un lien dans la navigation.

---

## 📝 Notes

- Les images des produits utilisent des URLs Unsplash. Remplacez-les par vos propres images pour la production.
- Le site ne nécessite aucun serveur backend - tout est statique.
- Compatible avec tous les navigateurs modernes (Chrome, Firefox, Safari, Edge).
