import { Client as PostgresConnector } from "pg";

let postgresConnection: Partial<PostgresConnector>;

export function getPostgresConnection() {
	if (!postgresConnection) createConnectionToPostgres();
	return postgresConnection;
}

function createConnectionToPostgres() {
	postgresConnection = new PostgresConnector({
		host: process.env.DB_LOCAL_HOST,
		port: Number(process.env.DB_LOCAL_PORT),
		database: process.env.DB_LOCAL_DATABASE,
		user: process.env.DB_LOCAL_API_USER,
		password: process.env.DB_LOCAL_API_SECRET,
	});
}

export function connect(
	postgresConnector: Partial<PostgresConnector>,
	connectionStatus: (status: { message: string; error?: Error }) => void
) {
	if (postgresConnector.connect) {
		postgresConnector.connect((error: Error) => {
			if (error)
				connectionStatus({ message: "This is an error", error: error });
			connectionStatus({ message: "Connected To Postgres Successfully" });
		});
	}
}
