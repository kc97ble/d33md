import express from "express";
import cors from "cors";
import * as logic from "./logic";

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
  const { text } = req.body;
  res.json({
    data: {
      url:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      latex: logic.mdToLatex(text),
    },
  });
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!!!!!");
});
