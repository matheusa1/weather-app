import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const Weather = (): ReactElement => {
	const router = useRouter()

	const { lat, lon } = router.query

	console.log(lat, lon)

	return (
		<div className='w-screen h-screen dark:bg-blueDark'>
			<div>
				<button>back</button>
				<button>switch theme</button>
			</div>
			<h1>{lat}</h1>
			<h1>{lon}</h1>
		</div>
	)
}

export default Weather
