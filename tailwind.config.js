/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			Inter: ['Inter', 'sans-serif'],
			Blinker: ['Blinker', 'sans-serif'],
		},
		extend: {
			dropShadow: {
				brownShadow: '0px 4px 6px rgba(196, 162, 135, 0.5)',
			},
			colors: {
				magentaDark: '#533745',
				magentaLight: '#826C7F',
				skin: '#EFEBCE',
				brown: '#C4A287',
				brownHover: '#BA9070',
				pinkLight: '#F8E0DD',
				pinkExtraLight: '#F7EDF0',
				white: '#F3F1F3',
				blue: '#508991',
				blueHover: '#497B82',
				blueDark: '#172A3A',
				green: '#004346',
				greenHover: '#003B3E',
				grayLight: '#EAEAEA',
			},
		},
	},
	plugins: [],
}
