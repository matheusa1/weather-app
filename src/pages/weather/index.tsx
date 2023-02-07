import { IconTitleSub } from '@/components/IconTitleSub'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'
import { switchTheme } from '../../utils/switchTheme'
import axios from 'axios'

import { FaTemperatureLow } from 'react-icons/fa'
import { RiContrastDrop2Fill } from 'react-icons/ri'
import { BiArrowBack } from 'react-icons/bi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { WeatherType } from '@/types'
import { GetIcon, iconWeather } from '../../utils/iconWeather'

const Weather = (): ReactElement => {
	const [cityName, setCityName] = React.useState<string>('ajustando ainda')
	const [weather, setWeather] = React.useState<WeatherType>()

	const hour = new Date().getHours()

	const iconText: any = iconWeather

	const router = useRouter()

	const { lat, lon } = router.query

	const getData = async () => {
		if (lat && lon) {
			const date = new Date().toISOString()
			console.log(date.split('T')[0])
			const { data: weatherData } = await axios.get(
				`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode&timezone=America%2FSao_Paulo&start_date=${
					date.split('T')[0]
				}&end_date=${date.split('T')[0]}`
			)
			const options = {
				method: 'GET',
				url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
				params: { location: `${lat}${lon}` },
				headers: {
					'X-RapidAPI-Key': process.env.RapidAPIKey,
					'X-RapidAPI-Host': process.env.RapidAPIHost,
				},
			}

			axios
				.request(options)
				.then(function (response) {
					setCityName(response.data.data[0].city)
				})
				.catch(function (error) {})

			setWeather(weatherData)
		}
	}

	useEffect(() => {
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lat, lon, hour])

	return (
		<div className='w-screen h-screen dark:bg-blueDark bg-whitePrimary darkT'>
			{weather && cityName ? (
				<>
					<div className='w-full flex justify-between dark:text-white text-magentaDark darkT'>
						<button onClick={switchTheme}>switch theme</button>
					</div>
					<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-[80%] overflow-hidden shadow-2xl'>
						<div className='dark:text-white text-magentaDark dark:bg-[#2B4861] bg-pinkLight p-4 darkT'>
							<header className='flex justify-between'>
								<BiArrowBack
									className='w-6 h-6 active:text-gray-300'
									onClick={() => router.push('/')}
								/>
								<h1 className='font-bold'>Weather App</h1>
								<div className='hidden' />
							</header>
							<main className='flex flex-col gap-4 items-center mt-4'>
								<div className='flex gap-2 items-center'>
									<HiOutlineLocationMarker className='w-5 h-5' />
									{cityName}
								</div>

								<GetIcon
									weatherCode={1}
									className='w-40 h-40'
								/>

								<span>
									{iconText[weather?.hourly?.weathercode[hour]]?.text
										.charAt(0)
										.toUpperCase() +
										iconText[weather?.hourly?.weathercode[hour]]?.text.slice(1)}
								</span>

								<strong className='text-4xl'>
									{`${weather?.hourly.temperature_2m[hour]} ${weather?.hourly_units.temperature_2m}`}
								</strong>
							</main>
						</div>
						<div className='flex flex-col bg-magentaDark dark:bg-bluePrimary darkT'>
							<div className='w-full border-t-2 border-t-white flex justify-center'>
								<IconTitleSub
									icon={<FaTemperatureLow className='w-6 h-6' />}
									title={`${weather?.hourly.apparent_temperature[hour]} ${weather?.hourly_units.apparent_temperature}`}
									subTitle={'Feels like'}
								/>
							</div>
							<div className='hidden' />
							<div className='w-full border-t-2 border-t-white flex justify-center'>
								<IconTitleSub
									icon={<RiContrastDrop2Fill className='w-6 h-6' />}
									title={`${weather?.hourly.relativehumidity_2m[hour]} ${weather?.hourly_units.relativehumidity_2m}`}
									subTitle={'Humidity'}
								/>
							</div>
						</div>
					</div>
				</>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}

export default Weather
