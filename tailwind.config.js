/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta Alba: neutros cálidos + un acento terracota
        paper: '#FAF8F5',
        sand: { 50: '#F5F1EB', 100: '#EDE7DD', 200: '#DDD4C5', 300: '#C4B8A5' },
        ink: { 900: '#1F1B16', 700: '#3F382F', 500: '#6B6256', 400: '#8A8174' },
        accent: { DEFAULT: '#B4532A', dark: '#963F1C', soft: '#F6E4DA' },
        success: '#3F6B4B',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Manrope Variable"', 'Manrope', '"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      // Tamaños pequeños con line-height y tracking pensados para pantalla.
      fontSize: {
        xs: ['0.8125rem', { lineHeight: '1.125rem', letterSpacing: '0.005em' }],
        sm: ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '-0.003em' }],
        base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '-0.006em' }],
        lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
};
