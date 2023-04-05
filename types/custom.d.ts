declare namespace Express {
	export interface Request {
		user: string;
	}
	interface JwtPayload {
		email: string;
	}
}
