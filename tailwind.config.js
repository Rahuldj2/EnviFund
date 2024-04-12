/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        themeBlack: '#060809',
        calmBlue: '#023968',
        oceanBlue: '#024668',
        themeCyan: '#026968',
        shallowOceanBlue: '#024C6F',
        tealBlue: '#026E97',
        grootLightGreen: '#1dcfab',
        grootGreen: '#07c484',
        grootRed: '#ce4343',
        grootBrown: '#d2af88'
      },
    },
    fontFamily: {
      'barlowSemiCondensed': [
        'Barlow Semi Condensed',
        'sans-serif',
      ],
      'titilliumWebRegular': [
        'Titillium Web',
        'sans-serif',
      ],
    },
    fontWeight: {
      'barlowSemiCondensed-thin': 100,
      'barlowSemiCondensed-extralight': 200,
      'barlowSemiCondensed-light': 300,
      'barlowSemiCondensed-regular': 400,
      'barlowSemiCondensed-medium': 500,
      'barlowSemiCondensed-semibold': 600,
      'barlowSemiCondensed-bold': 700,
      'barlowSemiCondensed-extrabold': 800,
      'barlowSemiCondensed-black': 900,
    },
    fontStyle: {
      'barlowSemiCondensed-italic': 'italic',
    },
  },
  plugins: [],
};
