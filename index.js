import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./src/routes/route.js";
import "./src/config/database.js";

const app = express();
const HOST = process.env.APP_URL || "localhost";
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
   return res.status(200).send({ message: "Docs available at /api" });
});

app.use("/api", router);

app.use((err, req, res, next) => {
   console.error(err.stack);
   return res.status(500).json({ error: err.message });
});

app.listen(process.env.APP_PORT, () => {
   console.log(`Server running at http://${HOST}:${PORT}`);
   console.log("Press Ctrl+C to stop the server");
});
