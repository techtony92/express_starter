import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import expressWinston from "express-winston";
import dotenv from "dotenv";
import path from "path";
import { auth } from "./api";
import { initializeLogger } from "./middleware";
import initializeStore from "connect-pg-simple";
import {
	connect,
	getPostgresConnection,
} from "./controllers/db/databaseActions";
dotenv.config();
const PORT: string = process.env.PORT || "3300";
const app = express();
const PostgresStore = initializeStore(session);
const sessionStore = new PostgresStore({
	conString: `postgresql://${process.env.DB_LOCAL_API_USER}:${process.env.DB_LOCAL_API_SECRET}@${process.env.DB_LOCAL_HOST}:${process.env.DB_LOCAL_PORT}/${process.env.DB_LOCAL_DATABASE}`,
	tableName: "user_sessions",
	createTableIfMissing: true,
});
const databaseConnection = getPostgresConnection();
connect(databaseConnection, ({ message, error }) => {
	console.log({ message: message, error: error });
});

app.use("/auth", auth);
app.use(
	session({
		store: sessionStore,
		secret: "shhhh!!!",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, //1day
		},
	})
);
app.use(function (request: Request, response: Response, next: NextFunction) {
	const baseURL = request.baseUrl;
	const fullURL = request.originalUrl;
	const ipAddress = request.ip;
	const restFunction = request.method;
	console.log({
		baseURL: baseURL,
		fullUrl: fullURL,
		ipAddress: ipAddress,
		method: restFunction,
	});
	next();
});
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
