/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        container: {
            center: true,
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: ['sunset', 'cupcake', 'retro', 'valentine', 'dracula', 'coffee'], // This is for applying DaisyUI theme to website
    },
};
