import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

app.listen(4001, () => {
	console.log(`Listening on http://localhost:4001`);
});
