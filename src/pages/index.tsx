import { ImSearch } from 'react-icons/im'

export default function Home() {
	const divisorClassName = 'w-20 h-[2px] bg-skin' 

	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='w-[80%] sm:w-[493px] p-14 flex flex-col items-center gap-12 shadow-2xl rounded-lg'>
				<h1 className='font-semibold text-2xl text-magentaDark font-Blinker'>
					Weather App
				</h1>
				<section className='flex flex-col items-center gap-4 w-full font-Inter text-xs'>
					<div className='flex relative w-full'>
						<input
							className='bg-pinkExtraLight sm:text-center shadow-lg px-2 h-10 text-left w-full hover:shadow-xl focus:shadow-lg transition-all duration-300 hover:bg-pinkLight focus:bg-pinkExtraLight outline-pinkLight'
							type='text'
							placeholder='Enter city name'
						/>
						<button className='absolute top-0 right-0 p-3 bg-magentaLight transition-all duration-300 hover:bg-magentaDark active:bg-black'>
							<ImSearch className='w-4 h-4 text-white' />
						</button>
					</div>
					<div className='flex gap-3 items-center'>
						<div className={divisorClassName} />
						or
						<div className={divisorClassName} />
					</div>
					<button className='p-3 text-white transition-all duration-300 bg-brown w-full drop-shadow-brownShadow hover:bg-brownHover active:bg-black'>
						Use device location
					</button>
				</section>
			</div>
		</div>
	)
}
