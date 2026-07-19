import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy"
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { create } from "express-handlebars";
import { loadUser } from "./middleware/auth.js";

import authController from "./controllers/auth.js";
import fishController from "./controllers/fish.js";
import bugController from "./controllers/bugs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const VITE_ORIGIN = process.env.VITE_ORIGIN || "http://localhost:5173";

// Handlebars setup
const hbs = create({ defaultLayout: false });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Catch and redirect calls to the Nookipedia API
app.use("/api/proxy", proxy('api.nookipedia.com', {
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    // Inject the API key in headers
    proxyReqOpts.headers['X-API-KEY'] = process.env.NOOKIPEDIA_API_KEY;
    proxyReqOpts.headers['Accept-Verson'] = '1.0.0';
    return proxyReqOpts;
  }
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(loadUser);

// API Routes
app.use("/api/auth", authController);
app.use("/api/fish", fishController);
app.use("/api/bugs", bugController);

// Serve the React app
if (process.env.NODE_ENV === "production") {
  // In production, load the Vite manifest and serve built files from client/dist
  const manifestPath = path.join(
    __dirname,
    "../client/dist/.vite/manifest.json"
  );
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const entries = Object.values(manifest).filter((e) => e.isEntry);
  const jsFiles = entries.map((e) => e.file);
  const cssFiles = [...new Set(entries.flatMap((e) => e.css || []))];

  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.render("index", {
      isDev: false,
      jsFiles,
      cssFiles,
    });
  });
} else {
  // In development, redirect asset/file requests to the Vite dev server
  app.use((req, res, next) => {
    if (req.path.includes(".")) {
      return res.redirect(`${VITE_ORIGIN}${req.path}`);
    }
    next();
  });

  // In development, Express serves the HTML which loads JS from Vite dev server
  app.get("*", (req, res) => {
    res.render("index", { isDev: true, viteOrigin: VITE_ORIGIN });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
