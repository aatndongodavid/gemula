/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gemula: {
          orange:    '#F5791C',
          ember:     '#C85A0F',
          burnt:     '#D94F00',
          gold:      '#FF9A3C',
          amber:     '#FBC02D',
          black:     '#1B1B1B',
          charcoal:  '#2A2A2A',
          asphalt:   '#3A3A3A',
          grey:      '#6B6B6B',
          silver:    '#E4E0D8',
          sand:      '#F7F3EC',
          cream:     '#FFF8F0',
          white:     '#FFFFFF'
        }
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '1240px',
        prose:   '72ch'
      },
      letterSpacing: {
        tightest: '-0.025em',
        kicker:   '0.14em'
      },
      fontSize: {
        'display-sm': ['clamp(2rem, 4vw, 2.75rem)',   { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.5rem, 5.5vw, 3.75rem)',{ lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(3rem, 7vw, 5rem)',       { lineHeight: '1.02', letterSpacing: '-0.03em' }]
      },
      boxShadow: {
        soft:  '0 4px 20px rgba(27, 27, 27, 0.06)',
        card:  '0 8px 30px rgba(27, 27, 27, 0.08)',
        lift:  '0 16px 40px rgba(27, 27, 27, 0.10)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};