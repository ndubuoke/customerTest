/* eslint-disable prettier/prettier */
/** @type {import('tailwindcss').Config} */
function pxToRem(value) {
  return `${value / 16}rem`
}

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-light': 'rgba(253, 197, 197, 0.4)',
        'primay-main': '#CF2A2A',
        'primary-dark': '#DB3539',

        'success-light': '#EAFFE7',
        'success-main': '#15692A',

        'info-light': '#F0F5FF',
        'info-main': '#0050C8',

        'warning-light': '#EAFFE7',
        'warning-main': '#F9F2F2',

        'common-black': '#000000',
        'common-white': '#ffffff',
        'common-title': '#AAAAAA',

        'text-primary': '#363636',
        'text-secondary': '#636363',
        'text-disabled': '#96989A',
        'text-tertiary': '#747373',
        'text-dark': '#212326',
        'text-lightYellow': '#D4A62F',
        'text-title': '#AAAAAA',
        'text-nav-link': ' #8F8F8F',

        'background-dash': '#E5E5E5',
        'background-paper': '#fff',
        'background-default': '#F7F7F7',
        'background-dark': '#EBE9E9',
        'background-disabled': '#96989A',
        'background-lightYellow': '#D5A62F',
        'background-lightRed': 'rgba(219, 53, 57, 0.02)',
        'background-red-muted': '#FDC5C5',
        'background-yellow-muted': 'rgba(253, 197, 197, 0.17);',

        'border-muted-yellow': '#E5E9EB',
        'lists-background': '#EAEAEA',
        'action-background': 'rgba(207, 42, 42, 0.13)',
        'action-type-background': 'rgba(255, 255, 255, 0.65)',
        'line-faint-background': '#DDDDDD',
        'button-hover-background': '#DC5A5D',
        'button-background': '#AAAAAA',
        'light-ash': 'rgba(170, 170, 170, 0.17)',
        ash: 'rgba(170, 170, 170)',
        'page-button-active-border': '#FFECEC',
        'page-button-border': '#CCCCCC',
      },

      screens: {
        sm: '37.5rem', // '30rem' default,
        md: '60rem', // '48rem' default,
        in: '68.75rem',
        lg: '80rem', // '61rem' default,
        xl: '90rem',
      },
      fontFamily: {
        default: [
          'Inter',
          'Roboto',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
        roboto: 'Roboto',
      },

      fontSize: {
        '5xl': pxToRem(46),
        '3xl': pxToRem(32),
        '2xl': pxToRem(26),
        // xl: pxToRem(24),
        lg: pxToRem(20),
        18: pxToRem(18),
      },
      lineHeight: {
        8: '1.875rem',
        4.5: '1.125rem',
      },
      maxWidth: {
        '8xl': '101.75rem',
        835: '52.1875rem',
        44: '10.875rem',
      },
      minWidth: {
        '7xl': '62.5rem',
        '4xl': '37.5rem',
        80: '20.4375rem',
        150: '9.375rem',
        60: '14.375rem',
        80: '20.4375rem',
      },
      width: {
        40: '10.875rem',
        60: '14.375rem',
        80: '20.4375rem',
        '8xl': '101.75rem',
        44: '10.875rem',
        9: '2.125rem',
      },
      height: {
        7.5: '1.875rem',
        20: '4.8125rem',
        32: '7.5rem',
        559: '34.9375rem',
        607: '37.9375rem',
      },
      maxHeight: {
        1117: '69.8125rem',
        920: '57.5rem',
        607: '37.9375rem',
        504: '31.5rem',
      },
      minHeight: {
        50: '31.25rem',
      },
      padding: {
        3: '.875rem',
        11: '2.875rem',
        2.5: '.75rem',
        1.5: '.3125rem',
      },
    },
  },
  plugins: [],
}
