import { exec } from "child_process";
import fs from "fs";
import path from "path";
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const DIST_DIR = "./dist";
const ENTRY_FILE = "./src/index.ts";
exec(
  `pnpm exec ncc build ${ENTRY_FILE} -o ${DIST_DIR} -m -C`,
  (error, stdout, stderr) => {
    if (error) {
      return console.error(`[build] NCC build error: ${error.message}`);
    }
    if (stderr) {
      console.error(`[build] NCC stderr: ${stderr}`);
    }
    console.log(`[build] NCC stdout: ${stdout}`);

    const indexJsPath = path.join(DIST_DIR, "index.js");
    try {
      let value = fs.readFileSync(indexJsPath, { encoding: "utf-8" });
      value = value.replaceAll("__dirname", "import.meta.url");
      fs.writeFileSync(indexJsPath, value);
      fs.renameSync(
        path.join(DIST_DIR, `index.js`),
        path.join(DIST_DIR, `${pkg.name}.js`)
      );
      fs.unlinkSync(path.join(DIST_DIR, `xdg-open`));
      fs.unlinkSync(path.join(DIST_DIR, `appIcon.png`));
    } catch (err) {
      return console.error(
        `[build] Error post-processing index.js: ${err.message}`
      );
    }
  }
);
