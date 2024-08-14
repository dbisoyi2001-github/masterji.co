/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cats': "url('/bg-3.jpg')",
        'jokes': "url('/bg-2.jpg')",
      },
      fontFamily: {
        pop: ['Poppins', 'sans-serif'], // Add your Google Font name here
      },
      boxShadow: {
        'right-bottom': '4px 4px 8px rgba(0, 0, 0, 0.2)', // Custom shadow
      },
    },
  },
  plugins: [],
}