// 0	Clear sky
// 1, 2, 3	Mainly clear, partly cloudy, and overcast
// 45, 48	Fog and depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail

import { IconBaseProps } from 'react-icons'
import {
	FaCloud,
	FaCloudSun,
	FaCloudShowersHeavy,
	FaSnowflake,
} from 'react-icons/fa'
import { RiSunLine } from 'react-icons/ri'

export const iconWeather = {
	0: { icon: 4, text: 'clear sky' },
	1: { icon: 4, text: 'mainly clear' },
	2: { icon: 1, text: 'partly cloudy' },
	3: { icon: 2, text: 'overcast' },
	45: { icon: 1, text: 'fog' },
	48: { icon: 1, text: 'depositing rime fog' },
	51: { icon: 3, text: 'drizzle light' },
	53: { icon: 3, text: 'drizzle moderate' },
	55: { icon: 3, text: 'drizzle dense' },
	56: { icon: 3, text: 'freezing drizzle light' },
	57: { icon: 3, text: 'freezing drizzle dense' },
	61: { icon: 3, text: 'rain slight' },
	63: { icon: 3, text: 'rain moderate' },
	65: { icon: 3, text: 'rain heavy' },
	66: { icon: 3, text: 'freezing rain light' },
	67: { icon: 3, text: 'freezing rain heavy' },
	71: { icon: 5, text: 'snow slight' },
	73: { icon: 5, text: 'snow moderate' },
	75: { icon: 5, text: 'snow heavy' },
	77: { icon: 5, text: 'snow grains' },
	80: { icon: 3, text: 'rain showers slight' },
	81: { icon: 3, text: 'rain showers moderate' },
	82: { icon: 3, text: 'rain showers violent' },
	85: { icon: 5, text: 'snow showers slight' },
	86: { icon: 5, text: 'snow showers heavy' },
	95: { icon: 3, text: 'thunderstorm slight' },
	96: { icon: 3, text: 'thunderstorm moderate' },
	99: { icon: 3, text: 'thunderstorm heavy' },
}

interface props extends IconBaseProps {
	weatherCode: number
}

export const GetIcon = ({ weatherCode, ...rest }: props) => {
	const clouds = <FaCloud {...rest} />
	const cloudySun = <FaCloudSun {...rest} />
	const rain = <FaCloudShowersHeavy {...rest} />
	const sun = <RiSunLine {...rest} />
	const winter = <FaSnowflake {...rest} />

	if (weatherCode === 1) return clouds
	if (weatherCode === 2) return cloudySun
	if (weatherCode === 3) return rain
	if (weatherCode === 4) return sun
	return winter
}
