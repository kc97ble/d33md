import * as uuid from "uuid";
import path from "path";
import fs from "fs";
import util from "util";
import childProcess from "child_process";
import _rimraf from "rimraf";

const mkdir = util.promisify(fs.mkdir);
const unlink = util.promisify(fs.unlink);
const rimraf = util.promisify(_rimraf);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);

const ROOT: string = "/tmp/d33md";
const PDFLATEX: string = "/usr/bin/pdflatex";
const STYLE_FILE: string = path.resolve(
  __dirname,
  "..",
  "..",
  "assets",
  "freecontest.sty"
);

const files: { [key: string]: string } = {};

export async function createSelfDestructingFolder(
  time: number = 600 * 1000
): Promise<string> {
  const id = uuid.v1();
  const folderPath = path.join(ROOT, id);
  await mkdir(folderPath, { recursive: true });
  setTimeout(async () => {
    console.log(`Deleting ${folderPath}...`);
    // await rimraf(folderPath);
    console.log(`Deleted.`);
  }, time);
  return folderPath;
}

type RunResult = { code: number; signal: string };

function run(executable, args, options): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const process = childProcess.execFile(
      executable,
      args,
      options,
      (error, stdout, stderr) => {
        console.debug({ error, stdout, stderr });
      }
    );
    process.stdin.end();
    process.on("exit", (code, signal) => {
      resolve({ code, signal });
    });
    process.on("error", (err: Error) => reject(err));
  });
}

export async function compileLatex(text: string): Promise<string> {
  const folderPath = await createSelfDestructingFolder();
  console.log(folderPath);
  const texFilePath = path.join(folderPath, "file.tex");
  const styFilePath = path.join(folderPath, "freecontest.sty");
  const pdfFilePath = path.join(folderPath, "file.pdf");
  await writeFile(texFilePath, text);
  await copyFile(STYLE_FILE, styFilePath);
  const { code, signal } = await run(PDFLATEX, [texFilePath], {
    cwd: folderPath,
  });
  if (code === 0) {
    const id = uuid.v1();
    files[id] = pdfFilePath;
    return id;
  } else {
    throw Error("?? :D ??");
  }
}

export function getRealPath(id: string): string | null {
  return files[id] || null;
}
