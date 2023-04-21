import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
	define: {
		__VALUE__: `"${process.env.VALUE}"`,
	},
	//....
});
