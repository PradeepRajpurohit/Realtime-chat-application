/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
         secondary:"#8696a0",
         "teal-light":"#7ae3c3",
         "photopicker-overlay-background":"rgba(30,42,49,0.8)",
         "panel-header-background":"#202c33",
         "search-input-container-background":"#0b141a",
         "teal-light":"#7ae3c3",
         "input-background":"#2a3942",
         "dropdown-background":"#182229",
         "dropdown-background-hover":"#182229",
         "input-background":"#2a3942"
      }
    },
  },
  plugins: [],
}
