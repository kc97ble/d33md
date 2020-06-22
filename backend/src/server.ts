import express from "express";
import cors from "cors";
import * as logic from "./logic";
import * as storage from "./storage";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.all("/convert", async (req, res) => {
  const { text } = req.body;
  const latex = logic.mdToLatex(text);
  const id = await storage.compileLatex(latex);
  res.json({ data: { id } });
});

app.all("/view/:id", (req, res) => {
  const { id } = req.params;
  const filePath = storage.getRealPath(id);
  res.sendFile(filePath);
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!!!!!");
});
