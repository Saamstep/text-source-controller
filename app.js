const express = require("express");
const fs = require("node-fs");
const path = require("path");
const app = express();
const osenv = require("os");
app.use(express.json());

/* Options */
const port = 3000;
const textPath = `${osenv.homedir()}\\OVERLAY_TEXT`;
console.log(`TEXT PATH = ${textPath}`);
const home = "/";

fs.access(path.join(textPath), fs.constants.W_OK, function (e) {
  if (e) {
    console.log(`Directory not found... Creating new directory in ${path.join(textPath)}`);
    fs.mkdir(path.join(textPath), function (e) {
      if (e) console.error(e);
    });
    const filesToWrite = ["blueName", "blueScore", "redName", "redScore", "talent1", "talent2"];
    for (f in filesToWrite) {
      fs.writeFile(path.join(textPath, `${filesToWrite[f]}.txt`), "", function (err) {
        if (err) return console.error(err);
      });
    }
  } else {
    console.log("Directory found!");
  }
});

app.get(home, (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/talent", (req, res) => {
  res.sendFile(path.join(__dirname, "src/talent.html"));
});

app.get("/style.css", (req, res) => {
  res.sendFile(path.join(__dirname, "src/style.css"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "src/script.js"));
});

app.get("/update", async (req, res) => {
  for (const prop in req.query) {
    fs.writeFile(path.join(textPath, prop + ".txt"), `${req.query[prop]}`, (err) => {
      if (err) console.error(err);
    });
  }
  res.redirect(home);
});

app.get("/reset", async (req, res) => {
  fs.writeFile(path.join(textPath, "redScore" + ".txt"), `0`, (err) => {
    if (err) console.error(err);
  });
  fs.writeFile(path.join(textPath, "blueScore" + ".txt"), `0`, (err) => {
    if (err) console.error(err);
  });
  res.redirect(home);
});

app.get("/swap", async (req, res) => {
  let d = {};
  let files = await fs.readdir(path.join(textPath));
  for (let i = 0; i < files.length; ++i) {
    let content = await fs.readFile(path.join(textPath, files[i]), "utf-8");
    d[files[i].split(".")[0]] = content;
  }

  fs.writeFile(path.join(textPath, "redScore" + ".txt"), `${d.blueScore}`, (err) => {
    if (err) console.error(err);
  });
  fs.writeFile(path.join(textPath, "blueScore" + ".txt"), `${d.redScore}`, (err) => {
    if (err) console.error(err);
  });
  fs.writeFile(path.join(textPath, "blueName" + ".txt"), `${d.redName}`, (err) => {
    if (err) console.error(err);
  });
  fs.writeFile(path.join(textPath, "redName" + ".txt"), `${d.blueName}`, (err) => {
    if (err) console.error(err);
  });

  res.redirect(home);
});

app.get("/red/plus", async (req, res) => {
  const score = await fs.readFile(path.join(textPath, "redScore" + ".txt"));
  let value = Number(score);
  value = parseInt(value + 1);
  fs.writeFile(path.join(textPath, "redScore" + ".txt"), `${value}`, (err) => {
    if (err) console.error(err);
  });
  res.redirect(home);
});

app.get("/blue/plus", async (req, res) => {
  const score = await fs.readFile(path.join(textPath, "blueScore" + ".txt"));
  let value = Number(score);
  value = parseInt(value + 1);
  fs.writeFile(path.join(textPath, "blueScore" + ".txt"), `${value}`, (err) => {
    if (err) console.error(err);
  });
  res.redirect(home);
});

app.get("/text", async (req, res) => {
  let response = [];
  console.log(path.join(textPath));
  let files = fs.readdirSync(textPath, "utf-8", function (err) {
    if (err) console.error(err);
  });

  for (let i = 0; i < files.length; ++i) {
    let content = fs.readFile(path.join(textPath, files[i]), "utf-8");
    response.push({ id: files[i].split(".")[0], value: content });
  }

  res.status(200).send({ files: response });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
