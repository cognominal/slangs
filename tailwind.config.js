const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

  plugins: [
  require('flowbite/plugin'),
  function({ addBase }) {
    addBase({
      'main': {
        // Apply box-sizing: content-box;
        boxSizing: 'content-box',
        // Set the maximum width to the minimum of   40rem or   100vw
        maxWidth: 'min(60rem,   100vw)',
        // Center the element horizontally
        marginLeft: 'auto',
        marginRight: 'auto',
        // Justify the text (assuming you have enabled text-justify in your config)
        textAlign: 'justify',
        // Add any other styles you want, such as padding or border
        // padding: '1rem', // Example padding
        // borderWidth: '2px', // Example border width
        // borderColor: 'gray', // Example border color
      },
    });
  },],

  darkMode: 'class',

  theme: {
    extend: {
      screens: {
        'vsm': '400px',
        // Add or override other breakpoints as needed
      },
    
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        }
      }
    }
  }
};

module.exports = config;
