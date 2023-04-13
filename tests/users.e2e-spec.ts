import { App } from "../src/app";
import { boot } from "../src/main";
import request from "supertest";

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe("Users e2e", () => {
	it("register - error", async () => {
		const response = await request(application.app).post("/users/register").send({
			name: "asdas@asd.ci",
			password: "asdas@asd.ci",
			email: "asdas@asd.ci",
		});
		expect(response.status).toBe(422);
	});
});

afterAll(() => {
	application.close();
});
