import express from "express";
import cors from "cors";
import logger from "./logger";
import * as logic from "../logic";
import * as storage from "../storage";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.all("/convert", async (req, res) => {
  try {
    const { text } = req.body;
    const latex = logic.mdToLatex(text);
    const id = await storage.compileLatex(latex);
    res.json({ data: { id } });
  } catch (e) {
    res.json({ error: e.toString() });
  }
});

app.all("/view/:id", (req, res) => {
  const { id } = req.params;
  const filePath = storage.getRealPath(id);
  res.sendFile(filePath, (e) => e && res.json({ error: e.toString() }));
});

app.all("/download/:id", (req, res) => {
  const { id } = req.params;
  const filePath = storage.getRealPath(id);
  res.download(filePath, (e) => e && res.json({ error: e.toString() }));
});

app.listen(3002, function () {
  console.log("App is listening on port 3002!!!!!");
});
