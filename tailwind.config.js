/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                domine: ['Domine', "sans-serif"],
                montserrat: ['Montserrat', 'sans-serif'],
                fahkwang: ['Fahkwang', 'sans-serif']
            },

            colors: {
                theme: {
                    primary: '#1F4168',
                    secondary: "#5681A3",
                    accent: "#ECF2FA"
                },
                button: {
                    primary: '#388DFF',
                    secondary: '#C0DBFF'
                },

            }
        },
    },
    plugins: [],
}

