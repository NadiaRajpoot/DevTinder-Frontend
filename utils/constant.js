// Prefer env override so production hits the deployed API with HTTPS; fall back to localhost for dev
export const BASE_URL =
	import.meta.env.VITE_API_URL ||
	(import.meta.env.DEV
		? "http://localhost:4444"
		: "https://devtinder-3x35.onrender.com");