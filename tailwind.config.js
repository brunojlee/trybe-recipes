module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#E7562F',
        yellow: '#FDBF50',
        grey1: '#F4F4F8',
        grey2: '#E5E5E5',
        darkblue: '#2A2C41',
      },
      backgroundImage: {
        'fork-knife': 'url(images/logoIcon.png")',
      },
      textDecorationThickness: {
        3: '3px',
      },
    },
  },
  plugins: [],
};
