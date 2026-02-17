# No I Am Not A IA

Générateur de photos par intelligence artificielle avec une expérience utilisateur inspirée des jeux vidéo — interface immersive, effets sonores et animations fluides.

## Aperçu

**No I Am Not A IA** transforme la génération d'images IA en une expérience ludique et immersive. L'interface s'inspire des menus de jeux vidéo avec des effets sonores (Howler.js), des animations dynamiques (Motion) et un design sombre et stylisé.

## Stack technique

| Catégorie | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript |
| **UI** | shadcn/ui, Radix UI, Tailwind CSS 4 |
| **Animations** | Motion (Framer Motion) |
| **Audio** | Howler.js |
| **Backend** | Supabase (auth + base de données) |
| **State** | Zustand |
| **Graphiques** | Recharts |
| **Validation** | Zod |

## Fonctionnalités

- Génération de photos par IA
- Interface style jeu vidéo avec effets sonores et animations
- Thème sombre par défaut (support light/dark via next-themes)
- Authentification utilisateur via Supabase
- Design responsive (desktop + mobile)
- 54+ composants UI prêts à l'emploi (shadcn/ui)

## Installation

```bash
# Cloner le repo
git clone https://github.com/votre-username/no-iam-not-a-ia.git
cd no-iam-not-a-ia

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Remplir les clés Supabase dans .env.local

# Lancer le serveur de dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Structure du projet

```
├── app/                  # Pages et layout (App Router)
│   ├── layout.tsx        # Layout racine (police JetBrains Mono)
│   ├── page.tsx          # Page d'accueil
│   └── globals.css       # Styles globaux + thème
├── components/ui/        # 54 composants UI (shadcn/ui)
├── hooks/                # Hooks custom (useIsMobile, etc.)
├── lib/                  # Utilitaires (cn, etc.)
└── public/               # Assets statiques
```

## Scripts

```bash
npm run dev       # Serveur de développement
npm run build     # Build de production
npm run start     # Lancer la build de production
npm run lint      # Linter ESLint
```

## Variables d'environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase |

## Licence

MIT
