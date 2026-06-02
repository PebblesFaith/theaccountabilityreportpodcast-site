// app.js

require("dotenv").config();

const path = require("path");

const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const publicRoutes = require("./routes/publicRoutes");

const app = express();

const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const contentSecurityPolicyDirectives = {
  defaultSrc: ["'self'"],
  baseUri: ["'self'"],
  connectSrc: ["'self'"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
  formAction: ["'self'"],
  frameAncestors: ["'self'"],
  imgSrc: ["'self'", "data:"],
  objectSrc: ["'none'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"]
};

if (NODE_ENV === "production") {
  contentSecurityPolicyDirectives.upgradeInsecureRequests = [];
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: contentSecurityPolicyDirectives
    }
  })
);

app.use(compression());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  express.static(path.join(__dirname, "public"), {
    etag: NODE_ENV === "production",
    lastModified: NODE_ENV === "production",
    maxAge: NODE_ENV === "production" ? "1d" : 0,
    setHeaders: (response) => {
      if (NODE_ENV !== "production") {
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");
        response.setHeader("Surrogate-Control", "no-store");
      }
    }
  })
);

app.use("/", publicRoutes);

app.use((request, response) => {
  response.status(404).send("Page not found.");
});

app.use((error, request, response, next) => {
  console.error(error);

  response.status(500).send(
    NODE_ENV === "production"
      ? "Internal server error."
      : `Internal server error: ${error.message}`
  );
});

app.listen(PORT, () => {
  console.log(
    `The Accountability Report Podcast website is running at http://localhost:${PORT}`
  );
});