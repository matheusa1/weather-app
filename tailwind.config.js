/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				magentaDark: '#533745',
				magentaLight: '#826C7F',
				skin: '#EFEBCE',
				brown: '#C4A287',
				pinkLight: '#F8E0DD',
				pinkExtraLight: '#F7EDF0',
				white: '#F3F1F3',
				blue: '#508991',
				blueDark: '#172A3A',
				green: '#004346',
				grayLight: '#EAEAEA',
			},
		},
	},
	plugins: [],
}
