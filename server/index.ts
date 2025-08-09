import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import xss from "xss";
import helmet, { contentSecurityPolicy } from "helmet";
import validator from "validator";
import path from "path";
import hpp from "hpp";
import { error } from "console";
const { middleware } = require("express-openapi-validator");
console.log("What is exported:", middleware);

dotenv.config();

if (process.env.NODE_ENV !== "production") {
  console.log("Raw ENV test:", process.env);
}
console.log("Email Config:");
console.log(" FROM:", process.env.EMAIL_FROM);
console.log(" TO: ", process.env.EMAIL_TO);
console.log(" PASS present:", !!process.env.EMAIL_PASS);

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

const limiter = rateLimit({});

app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    referrerPolicy: { policy: "no-referrer" },
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);
app.use(hpp())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
      error: "Too many requests from this IP, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10kb' }));

app.use(
  middleware({
    apiSpec: path.join(__dirname, "./openapi.yaml"),
    validateRequests: true,
    validateResponses: true,
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  err
    ? console.error("Transporter failed", err)
    : console.log("Mail transporter ready");
});

app.post("/api/contact", async (req: Request, res: Response) => {
  console.log("Contact form hit:", req.body);

  const name = xss((req.body.name ?? "").trim());
  const email = xss((req.body.email ?? "").trim());
  const message = xss((req.body.message ?? "").trim());

  console.log("Sanitized values:", { name, email, message });

  if (!name || !email || !message) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  if (!validator.isEmail(email)) {
    console.warn("Blocked invalid email:", email);
    res.status(400).json({ error: "Invalid email format." });
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Contact form: ${name || "No Name"}`,
      text: `From: ${name || "Anonymous"} <${email}>\n\n${message}`,
    });
    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unexpected error";
    console.error("Full error object:", err);
    res.status(500).json({ error: msg });
  }
});

app.use(
  (err: any, _req: Request, res: Response, _next: express.NextFunction) => {
    const status = err.status || 500;
    res.status(status).json({
      error: err.message || "Internal Server Error",
      details: err.errors || undefined,
    });
  }
);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server ready on http://12.0.0.1:${PORT}`)
);
