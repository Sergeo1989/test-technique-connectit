export const environment = {
	production: true,
	apiURL: "http://localhost:8080/api/v1",
	firebase: {
		apiKey: "...",
		authDomain: "...",
		projectId: "...",
		storageBucket: "...",
		messagingSenderId: "...",
		appId: "...",
		measurementId: "...",
	},
} as const;
