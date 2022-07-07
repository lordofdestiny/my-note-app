import fs from "fs";
import path from "path";
import * as envfile from "envfile";
import { promisify } from "util";
import { randomFill } from "crypto";

const myArgs = process.argv.slice(2);
const [location = "./", varName = "SESSION_SECRET", strLength = "32", ...rest] =
  myArgs;

const length = Number.parseInt(strLength);
const fileName = path.resolve(location, ".env");

try {
  const secretBuffer = await promisify(randomFill)(Buffer.alloc(length));
  const secret = secretBuffer.toString("hex");
  const fileText = await promisify(fs.readFile)(fileName);
  const env = envfile.parse(fileText);
  env[varName] = secret;
  const fileTextNew = envfile.stringify(env);
  await promisify(fs.writeFile)(fileName, fileTextNew);
  console.log("Successfully generated new secret!");
} catch ({ message }) {
  console.log(message);
}
