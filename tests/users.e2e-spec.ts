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
	it("login - error", async () => {
		const response = await request(application.app).post("/users/login").send({
			password: "asdas@asd.ci123123",
			email: "asdas@asd.ci",
		});
		expect(response.status).toBe(403);
	});
	it("login - success", async () => {
		const response = await request(application.app).post("/users/login").send({
			password: "asdas@asd.ci",
			email: "asdas@asd.ci",
		});
		expect(response.status).toBe(200);
	});
	it("info - error", async () => {
		const response = await request(application.app).get("/users/info").send();
		expect(response.status).toBe(401);
	});
	it("info - success", async () => {
		const { body } = await request(application.app).post("/users/login").send({
			password: "asdas@asd.ci",
			email: "asdas@asd.ci",
		});
		console.log(body.jwt);
		const response = await request(application.app)
			.get("/users/info")
			.set("Authorization", `Token ${body.jwt}`)
			.send();

		expect(response.status).toBe(200);
	});
});

afterAll(() => {
	application.close();
});
