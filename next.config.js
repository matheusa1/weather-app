/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		RapidAPIKey: process.env.RapidAPIKey,
		RapidAPIHost: process.env.RapidAPIHost,
	},
}

module.exports = nextConfig
