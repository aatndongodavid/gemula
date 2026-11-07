/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gemula: {
          // Couleurs de marque
          orange:   '#F5791C', // Impact Orange : fonds, drapeau, boutons
          ember:    '#C85A0F', // survol des fonds orange
          accent:   '#A84A0A', // orange lisible pour du texte sur fond clair
          gold:     '#FF9A3C',
          amber:    '#FBC02D',
          burnt:    '#D94F00',
          // Neutres
          black:    '#1B1B1B', // Track Black : texte principal
          charcoal: '#2A2A2A',
          asphalt:  '#3A3A3A',
          grey:     '#55554F', // texte secondaire (contraste AA)
          silver:   '#E4E3DE', // bordures
          sand:     '#F5F5F2', // fonds de sections alternées
          cream:    '#FAFAF8',
          white:    '#FFFFFF'
        }
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '1200px',
        prose:   '68ch'
      },
      letterSpacing: {
        tightest: '-0.02em',
        kicker:   '0.02em'
      },
      fontSize: {
        'display-sm': ['clamp(1.75rem, 3.2vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2.125rem, 4.4vw, 3rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5.6vw, 3.75rem)',  { lineHeight: '1.06', letterSpacing: '-0.025em' }]
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27, 27, 27, 0.05)',
        card: '0 1px 2px rgba(27, 27, 27, 0.04), 0 8px 24px rgba(27, 27, 27, 0.06)',
        lift: '0 12px 32px rgba(27, 27, 27, 0.10)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
