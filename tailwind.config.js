/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				"mauve-gradient": "linear-gradient(to right, #525252, #3d72b4)",
			},
			fontFamily: {
        caveat: ["'Caveat', cursive"],
      },
			colors: {
				primary: {
					main: "#0891b2",
					light: "#06b6d4",
					dark: "#0e7490",
					contrastText: "#f8fafc"
				},
				secondary: {
					main: "#eab308",
					light: "#facc15",
					dark: "#ca8a04",
					contrastText: "#f8fafc"
				}
			},
		},
	},
	plugins: [],
}
