import express from "express";
import expressWinston from "express-winston";
import path from "path";
import { auth } from "./api";
import { initializeLogger } from "./middleware";
const PORT: string = process.env.PORT || "3300";
const app = express();

app.use("/auth", auth);
app.use(
	expressWinston.logger(
		initializeLogger({
			logLevel: "info",
			fileName: "auth_log",
			dirName: `${path.resolve(path.join(__dirname, "./logs/"))}`,
		})
	)
);
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.listen(PORT, () => {
	console.log(`Server Running on PORT ${PORT}`);
});
