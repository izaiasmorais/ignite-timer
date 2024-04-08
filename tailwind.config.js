/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundColor: {
				product: {
					500: "#00B37E",
					600: "#00875F",
					700: "#015F43",
				},
				feedback: {
					600: "#F03847",
					700: "#00875F",
				},
				base: {
					800: "#121214",
					700: "#202024",
					600: "#323238",
					500: "#7C7C8A",
					400: "#8D8D99",
					300: "#C4C4CC",
					200: "#E1E1E6",
					100: "#FFFFFF",
				},
			},
		},
	},
	plugins: [],
};
