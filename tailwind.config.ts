import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'default': '#322828',
        'primaria': '#B5A6F3',
        'secundaria': '#C9E47B',
        'terciaria': '#DFEAFF',
        'preto': '#322828',
        'branco': '#F5F5F5',
        'cinza-claro':'#E8E8E8',
        'cinza': '#BDBDBD',
        'cinza-escuro': '#4F4F4F',
        'error' : '#E94444',
        'verde': '#37BC2C',
        'azul-hover': '#c4d5f3',
        'roxo-select': '#6954C0'
      },
      fontFamily: {
        'poppins': ['Poppins'],
        'averia': ['"Averia Sans Libre"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
