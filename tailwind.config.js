/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";
export default ({
  purge: [  // This will catch all components, even deeply nested ones
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  content: ['./src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});

