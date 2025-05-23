import express, { Request, Response } from "express";
import { config } from "dotenv";
import { router } from "./routes";
import os from "os"

// Using Volumes for local machines, When using CI/CD Pipelines use Secrets Managers
config({ path: "/etc/express_env/.env" });

const app = express();

app.use(express.json());

const { PORT } = process.env;

app.get("/", (_: Request, res: Response): any => {
  return res.status(200).json({
    message: "Hello world!",
  });
});

app.get("/ping", (_: Request, res: Response): any => {
  return res.status(200).json({
    message: `Served by: ${os.hostname()}`,
  });
});

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}.....`);
  console.log(`Served by: ${os.hostname()}`);
});
