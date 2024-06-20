/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      height:{
        '10p':'10%',
        '16p':'16%',
        '17p':'17%',
        '90p':'90%',
        '85p':'85%'
      },
    
    }
    
   
  },
  
  plugins: [],
}

