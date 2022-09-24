import express from "express";
import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();


app.use("/users", userRouter);

app.listen(port, () => {
});

