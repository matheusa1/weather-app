export type WeatherType = {
	elevation: number
	generationtime_ms: number
	latitude: number
	longitude: number
	timezone: string
	timezone_abbreviation: string
	utc_offset_seconds: number
	hourly_units: {
		apparent_temperature: string
		relativehumidity_2m: string
		temperature_2m: string
		time: string
		weathercode: string
	}
	hourly: {
		apparent_temperature: number[]
		relativehumidity_2m: number[]
		temperature_2m: number[]
		time: string[]
		weathercode: number[]
	}
}

export type CitiesType = {
	city: string
	country: string
	countrycode: string
	id: number
	latitude: number
	longitude: number
	name: string
	population: number
	region: string
	regionCode: string
	type: string
	wikiDataId: string
}
