/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}",
        "./src/index.{html,ts}"
    ],

    theme: {
        extend: {
            screens: {
                'xl': '72rem',
                'lg': '56rem',
                'md': '50rem',
                'sx': '38rem',
                'xxs': '24rem',
            },
            colors: {
                text: 'var(--color-text)',
                background: 'var(--color-bg)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
            },
            fontFamily: {
                lexend: ['"Lexend"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
