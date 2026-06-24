const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"), ...createGlobPatternsForDependencies(__dirname)],
	theme: {
		extend: {
			colors: {
				primary: "#333",
				secondary: "#004fff",
				accent: "",
				danger: "",
			},
			fontSize: {
				sm: "12px",
				base: "14px",
				lg: "16px",
			},
			fontFamily: {
				sans: ["Nunito"],
			},
			backgroundImage: {
				"auth-layout-background":
					"linear-gradient(rgb(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('/assets/images/auth_layout_background.png')",
				"auth-layout-company-logo": "url('/assets/images/auth_layout_company_logo.png')",
				"grey-gradient": "linear-gradient(to bottom, #2E2A2B, #6A6769)",
			},
		},
	},
	plugins: [],
};
