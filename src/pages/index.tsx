import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { ImSearch } from 'react-icons/im'
import { GiArrowDunk } from 'react-icons/gi'

import Mountain from '../assets/mountain.svg'
import { useRouter } from 'next/router'

export default function Home() {
	const [isOnSearch, setIsOnSearch] = useState<boolean>(false)
	const [text, setText] = useState<string>('Loading ...')
	const [loadingStatus, setLoadingStatus] = useState<
		'error' | 'success' | 'loading'
	>('loading')

	const router = useRouter()

	const divisorClassName = 'w-20 h-[2px] bg-skin dark:bg-grayLight darkT'

	const switchTheme = () => {
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.remove('dark')
			localStorage.removeItem('theme')
		} else {
			document.documentElement.classList.add('dark')
			localStorage.theme = 'dark'
		}
	}

	const searchLocation = () => {
		setText('Loading...')
		setLoadingStatus('loading')

		setIsOnSearch(true)
	}

	const getLocation = async () => {
		setText('Loading...')
		setLoadingStatus('loading')
		setIsOnSearch(true)

		await navigator.geolocation.getCurrentPosition(
			(location) => {
				setText('Success!')
				setLoadingStatus('success')

				router.push({
					pathname: '/weather',
					query: {
						lat: location.coords.latitude,
						lon: location.coords.longitude,
					},
				})
			},
			(e) => {
				setText(e.message)
				setLoadingStatus('error')
			}
		)
	}

	return (
		<div className='max-w-screen h-screen flex flex-col justify-between sm:justify-center items-center bg-white dark:bg-blueDark transition-colors duration-500'>
			<div
				className={`mt-10 sm:mt-0 w-[80%] sm:w-[493px] p-14 flex flex-col items-center shadow-2xl rounded-lg darkT ${
					isOnSearch ? 'gap-20' : 'gap-12'
				}`}
			>
				<h1 className='font-semibold text-2xl text-magentaDark font-Blinker dark:text-white darkT'>
					Weather App
				</h1>
				<section className='flex flex-col items-center gap-4 w-full font-Inter text-xs relative sm:text-sm'>
					{isOnSearch && (
						<motion.div
							className={`h-10 w-full ${
								loadingStatus === 'error'
									? `bg-red-400 text-white`
									: loadingStatus === 'loading'
									? `dark:bg-[#D3DEDE] bg-grayLight`
									: `bg-green-400 text-white`
							} flex items-center justify-center absolute`}
							initial={{ top: 0, left: 0 }}
							animate={{ top: -50, left: 0 }}
							transition={{ duration: 0.2 }}
						>
							{text}
						</motion.div>
					)}
					<div className='flex relative w-full'>
						<input
							className='dark:bg-grayLight dark:hover:bg-gray-300 dark:focus:bg-grayLight bg-pinkExtraLight sm:text-center shadow-lg px-2 h-10 text-left w-full hover:shadow-xl focus:shadow-lg darkT hover:bg-pinkLight focus:bg-pinkExtraLight outline-none'
							type='text'
							placeholder='Enter city name'
						/>
						<button
							className='absolute top-0 right-0 p-3 bg-magentaLight transition-all duration-300 hover:bg-magentaDark active:bg-black dark:bg-greenPrimary dark:hover:bg-greenHover dark:active:bg-black'
							onClick={searchLocation}
						>
							<ImSearch className='w-4 h-4 text-white' />
						</button>
					</div>
					<div className='flex gap-3 items-center dark:text-white darkT'>
						<div className={divisorClassName} />
						or
						<div className={divisorClassName} />
					</div>
					<button
						className='p-3 text-white transition-all duration-300 bg-brownPrimary w-full drop-shadow-brownShadow hover:bg-brownHover active:bg-black dark:bg-bluePrimary dark:shadow-lg dark:drop-shadow-none dark:hover:bg-blueHover dark:active:bg-black'
						onClick={getLocation}
					>
						Use device location
					</button>
				</section>
			</div>
			<div
				onClick={switchTheme}
				id='switchTheme'
				className='h-1/6'
			>
				<label
					htmlFor='switchTheme'
					className='fixed w-fit sm:absolute right-2 bottom-64 xl:bottom-[400px] lg:left-20 lg:bottom-[300px] sm:bottom-60 sm:left-48 sm z-50 flex gap-4 darkT dark:text-white text-black items-end'
				>
					<GiArrowDunk className='w-6 h-6 xl:w-10 xl:h-10 sm:w-8 sm:h-8 -scale-x-100' />
					Switch Theme
				</label>
				<Image
					className='z-50 fixed sm:absolute bottom-0 left-0 xl:w-auto lg:w-64 sm:w-56 w-72'
					src={Mountain}
					alt={'Mountain'}
				/>
				<div className='w-72 h-72 -left-3 dark:bg-mountainNight bg-blue-300 transition-all duration-1000 ease-in-out xl:w-96 xl:h-96 lg:w-72 lg:h-72 sm:absolute fixed bottom-0 xl:-left-20 lg:-left-10 sm:w-64 sm:h-64 sm:-left-5 rounded-full' />
				<div
					className={`w-20 h-20 left-40 bottom-40 dark:left-12 dark:bottom-24 xl:w-24 xl:h-24 lg:w-16 lg:h-16 lg:bottom-44 lg:left-32 sm:w-14 sm:h-14 dark:sm:bottom-[4.5rem] dark:sm:left-10 dark:lg:bottom-[5.5rem] dark:lg:left-10 sm:bottom-40 sm:left-32 rounded-full fixed sm:absolute transition-all ease-in-out duration-1000 dark:xl:bottom-32 dark:xl:left-14 dark:bg-[#FB6849] xl:bottom-60 dark:shadow-orange-400 bg-yellow-400 shadow-yellow-300 shadow-lg `}
				/>
			</div>
		</div>
	)
}
