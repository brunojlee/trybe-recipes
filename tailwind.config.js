module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#E7562F',
        yellow: '#FDBF50',
        yellow2: '#FFD180',
        grey1: '#F4F4F8',
        grey2: '#E5E5E5',
        grey3: '#A9A9A9',
        darkblue: '#2A2C41',
      },
      fontSize: {
        tiny: '0.6rem',
      },
      backgroundImage: {
        'fork-knife': 'url(images/logoIcon.png")',
      },
      textDecorationThickness: {
        3: '3px',
      },
      dropShadow: {
        md: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
