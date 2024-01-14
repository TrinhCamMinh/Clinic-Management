/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            zIndex: {
                100: '100',
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui'), require('flowbite/plugin')],
    daisyui: {
        themes: ['light', 'sunset', 'cupcake', 'retro', 'valentine', 'dracula', 'coffee'], // This is for applying DaisyUI theme to website
    },
};
