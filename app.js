const { text } = require("body-parser");
const express = require("express");
const fs = require("node-fs").promises;
const path = require("path");
const app = express();
app.use(express.json());

/* Options */
const port = 3000;
const textPath = "text/";
const home = "/";

app.get(home, (req, res) => {
  res.sendFile(path.join(__dirname, "src/html/index.html"));
});

app.get("/update", async (req, res) => {
  for (const prop in req.query) {
    fs.writeFile(path.join(__dirname, textPath, prop + ".txt"), `${req.query[prop]}`, (err) => {
      if (err) console.error(err);
    });
  }
  res.redirect(home);
});

app.get("/text", async (req, res) => {
  let response = [];
  let files = await fs.readdir(path.join(__dirname, textPath));
  for (let i = 0; i < files.length; ++i) {
    let content = await fs.readFile(path.join(__dirname, textPath, files[i]), "utf-8");
    response.push({ id: files[i].split(".")[0], value: content });
  }

  res.status(200).send({ files: response });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
