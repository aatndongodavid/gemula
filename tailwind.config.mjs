/** @type {import('tailwindcss').Config} */
// Thème sombre inspiré des interfaces produit sobres (fond quasi noir, lignes fines, accent orange Gemula).
// Les couleurs sont nommées par rôle : changer une valeur ici met à jour tout le site.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#08090A', // fond de page
        surface:   '#0F1011', // cartes
        'surface-2': '#151618', // sections alternées, cartes en survol
        'surface-3': '#1C1D20', // éléments surélevés
        line:      '#212226', // bordures
        'line-strong': '#34363B',
        fg:        '#F7F8F8', // texte principal
        muted:     '#9A9FA8', // texte secondaire (contraste 7:1 sur le fond)
        subtle:    '#6B7079', // décor uniquement, pas pour du texte courant
        accent: {
          DEFAULT: '#FF5000', // orange du logo : boutons, drapeau
          text:    '#FF8547', // orange lisible pour du texte sur fond sombre
          soft:    '#2A1408'  // fond orangé discret
        },
        success: '#4CC38A',
        danger:  '#FF6B6B'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        brand:   ['Poppins', 'Inter', 'sans-serif']
      },
      maxWidth: {
        content: '1200px',
        prose:   '68ch'
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter2: '-0.022em'
      },
      fontSize: {
        'display-sm': ['clamp(1.75rem, 3.2vw, 2.5rem)',  { lineHeight: '1.12', letterSpacing: '-0.028em' }],
        'display-md': ['clamp(2.25rem, 5vw, 3.5rem)',    { lineHeight: '1.06', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.75rem, 7vw, 4.75rem)',   { lineHeight: '1.02', letterSpacing: '-0.042em' }]
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px -20px rgba(255,80,0,0.25)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset'
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } }
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
