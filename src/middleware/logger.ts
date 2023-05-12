import { createLogger, format, transports } from "winston";

type error = 0;
type warn = 1;
type info = 2;
type http = 3;
type verbose = 4;
type debug = 5;
type logLevelCode = {
	error: error;
	warn: warn;
	info: info;
	http: http;
	verbose: verbose;
	debug: debug;
};

type loggerLevelNames =
	| "error"
	| "warn"
	| "info"
	| "http"
	| "verbose"
	| "debug";

type loggerAttributes = {
	logLevel: loggerLevelNames;
	fileName: string;
	dirName?: string;
};
const logLevels: logLevelCode = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	verbose: 4,
	debug: 5,
};
export function initializeLogger(logDefinitions: loggerAttributes) {
	if (logDefinitions.dirName === undefined) {
		logDefinitions.dirName = "./";
	}
	return createLogger({
		level: logDefinitions.logLevel,
		levels: logLevels,
		format: format.combine(
			format.prettyPrint(),
			format.timestamp({
				format: "DD-MM-YYYY hh:mm:ss A",
			}),
			format.printf((logInfo) => {
				return `${logInfo.timestamp} - ${logInfo.level}: ${logInfo.message}`;
			})
		),
		transports: [
			new transports.Console(),
			new transports.File({
				dirname: `${logDefinitions.dirName}`,
				filename: `${logDefinitions.fileName}`,
			}),
		],
	});
}
