const express = require("express");
const app = express();
const dir = `${__dirname}/public/`;

app.get("/", (req, res) => {
  res.sendFile(dir + "index.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(dir + "contact.html");
});

// Serve a 404 page on all other accessed routes, or redirect to specific page
app.get("*", (req, res) => {
  //   res.sendFile(dir + "404.html");
  //   res.redirect("/");
});

app.listen(8000);
