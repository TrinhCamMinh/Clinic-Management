/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'sunset', 'cupcake'], // This is for applying DaisyUI theme to website
    },
};
