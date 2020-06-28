import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import path from "path";

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

export default morgan("combined", { stream: accessLogStream });
