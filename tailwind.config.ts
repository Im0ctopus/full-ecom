import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        skeleton: {
          '0%, 100%': { 'background-color': 'rgb(228, 228, 231)' },
          '50%': { 'background-color': 'rgb(161, 161, 170)' },
        },
      },
      animation: {
        skeleton: 'skeleton 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
