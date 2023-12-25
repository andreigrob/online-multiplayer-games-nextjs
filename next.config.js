/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: ''
			}
		],
		minimumCacheTTL: 3600
	}
};

module.exports = nextConfig;
