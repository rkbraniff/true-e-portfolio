import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.post("/test", async (req: Request, res: Response) => {
  res.json({ msg: "Works perfectly" });
});

app.listen(1234, () => console.log("🧪 Test server running"));
