import express from "express";
import cors from "cors";
import { config } from "dotenv";
import router from "./src/routes/route.js";
import "./src/config/database.js";

config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.APP_PORT, () => {
   console.log(`Server running on [http://${process.env.APP_URL}:${process.env.APP_PORT}]. \nPress Ctrl+C to stop the server`);
});

app.get("/", (req, res) => {
   res.status(200).send({ message: "Docs on /api" });
});

app.use("/api", router);
