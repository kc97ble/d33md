import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.all("/convert", (req, res) => {
  console.log(Object.keys(req));
  console.log(req.params);
  console.log(req.body);
  res.json({ data: "ok" });
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!!!!!");
});
