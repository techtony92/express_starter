declare global {
	namespace NODEJS {
		interface ProcessENV {
			DB_LOCAL_API_USER: string;
			DB_LOCAL_API_SECRET: string;
			DB_LOCAL_HOST: string;
			DB_LOCAL_PORT: number;
			DB_LOCAL_DATABASE: string;
			DB_LOCAL_SESSION_DATABASE: string;
		}
	}
}

export {};
