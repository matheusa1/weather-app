export const switchTheme = () => {
	if (localStorage.theme === 'dark') {
		document.documentElement.classList.remove('dark')
		localStorage.removeItem('theme')
	} else {
		document.documentElement.classList.add('dark')
		localStorage.theme = 'dark'
	}
}
