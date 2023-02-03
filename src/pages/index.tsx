import { useState } from 'react'
import { ImSearch } from 'react-icons/im'

export default function Home() {
	const [isOnSearch, setIsOnSearch] = useState<boolean>(false)

	const divisorClassName = 'w-20 h-[2px] bg-skin dark:bg-grayLight darkT'

	const switchTheme = () => {
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.remove('dark')
			localStorage.removeItem('theme')
			console.log('a')
		} else {
			document.documentElement.classList.add('dark')
			localStorage.theme = 'dark'
		}
	}

	return (
		<div className='w-screen h-screen flex items-center justify-center bg-[#fff] dark:bg-blueDark darkT'>
			<button
				className='absolute top-2 left-2 dark:text-white darkT'
				onClick={switchTheme}
			>
				Trocar tema
			</button>
			<div className='w-[80%] sm:w-[493px] p-14 flex flex-col items-center gap-12 shadow-2xl rounded-lg'>
				<h1 className='font-semibold text-2xl text-magentaDark font-Blinker dark:text-white darkT'>
					Weather App
				</h1>
				<section className='flex flex-col items-center gap-4 w-full font-Inter text-xs relative'>
					{isOnSearch && (
						<div className='h-10 w-full bg-grayLight flex items-center justify-center absolute top-0 left-0 darkT  -translate-y-14'>
							Loading...
						</div>
					)}
					<div className='flex relative w-full'>
						<input
							className='dark:bg-grayLight dark:hover:bg-gray-300 dark:focus:bg-grayLight bg-pinkExtraLight sm:text-center shadow-lg px-2 h-10 text-left w-full hover:shadow-xl focus:shadow-lg darkT hover:bg-pinkLight focus:bg-pinkExtraLight outline-none'
							type='text'
							placeholder='Enter city name'
						/>
						<button
							className='absolute top-0 right-0 p-3 bg-magentaLight transition-all duration-300 hover:bg-magentaDark active:bg-black dark:bg-green dark:hover:bg-greenHover dark:active:bg-black'
							onClick={() => setIsOnSearch(!isOnSearch)}
						>
							<ImSearch className='w-4 h-4 text-white' />
						</button>
					</div>
					<div className='flex gap-3 items-center dark:text-white darkT'>
						<div className={divisorClassName} />
						or
						<div className={divisorClassName} />
					</div>
					<button className='p-3 text-white transition-all duration-300 bg-brown w-full drop-shadow-brownShadow hover:bg-brownHover active:bg-black dark:bg-blue dark:shadow-lg dark:drop-shadow-none dark:hover:bg-blueHover dark:active:bg-black'>
						Use device location
					</button>
				</section>
			</div>
		</div>
	)
}
