import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  plugins: [require('@tailwindcss/container-queries')],
  theme: {
    extend: {
      colors: {
        primary: '#2CC3F2',
      },
    },
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
  },
};
