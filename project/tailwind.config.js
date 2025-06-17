/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scrollbar: {
        width: '4px',
        track: 'bg-transparent',
        thumb: 'bg-gray-300 rounded-full',
        thumbHover: 'bg-gray-400',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: theme('scrollbar.width', '4px'),
            height: theme('scrollbar.width', '4px'),
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme('scrollbar.track', 'transparent'),
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('scrollbar.thumb', '#CBD5E0'),
            borderRadius: '9999px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme('scrollbar.thumbHover', '#A0AEC0'),
          },
          'scrollbar-width': 'thin',
          'scrollbar-color': `${theme('scrollbar.thumb', '#CBD5E0')} ${theme('scrollbar.track', 'transparent')}`,
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],
};
