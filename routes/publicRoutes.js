// routes/publicRoutes.js

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/episodes", (req, res) => {
  res.render("episodes");
});

router.get("/reports", (req, res) => {
  res.render("reports");
});

router.get("/submit-tip", (req, res) => {
  res.render("submitatip");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/disclaimer", (req, res) => {
  res.render("disclaimer");
});

router.get("/privacy-policy", (req, res) => {
  res.render("privacypolicy");
});

router.get("/editorial-policy", (req, res) => {
  res.render("editorialpolicy");
});

router.get("/corrections-policy", (req, res) => {
  res.render("correctionspolicy");
});

module.exports = router;