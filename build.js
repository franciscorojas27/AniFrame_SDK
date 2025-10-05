import { exec } from "child_process";
import fs from "fs";
import path from "path";

const PLUGIN_NAME = process.env.PLUGIN_NAME ?? "animeai";
const TEMP_EXE = "./dist.exe";
const DIST_DIR = "./dist";
const ENTRY_FILE = "./src/index.ts";
const OUTPUT_JS = path.join(DIST_DIR, "index.js");
const OUTPUT_EXE = path.join(DIST_DIR, `${PLUGIN_NAME}.exe`);

exec(`pnpm exec ncc build ${ENTRY_FILE} -o ${DIST_DIR}`, (error, stdout, stderr) => {
  if (error) return console.error(`[build] NCC build error: ${error.message}`);
  if (stderr) console.error(`[build] NCC stderr: ${stderr}`);
  console.log(`[build] NCC stdout: ${stdout}`);

  try {
    let code = fs.readFileSync(OUTPUT_JS, "utf-8");
    code = code.replace(/__dirname/g, "import.meta.url");
    fs.writeFileSync(OUTPUT_JS, code);
  } catch (err) {
    return console.error(`[build] Error processing index.js: ${err.message}`);
  }

  continueBuild();
});

function continueBuild() {
  const DENO_JSON = path.join(DIST_DIR, "deno.json");
  if (!fs.existsSync(DENO_JSON)) {
    fs.writeFileSync(
      DENO_JSON,
      JSON.stringify(
        {
          compilerOptions: {
            lib: ["deno.ns", "dom"],
            types: ["npm:@types/node"],
          },
          nodeModulesDir: "auto",
        },
        null,
        2
      )
    );
  }

  if (!fs.existsSync(path.join(DIST_DIR, "node_modules"))) {
    exec("pnpm exec deno install", (err) => {
      if (err) console.error("[build] Deno install failed:", err);
    });
  }

  exec(
    `pnpm exec deno compile --target x86_64-pc-windows-msvc --allow-read --allow-write --allow-run --allow-env --allow-sys --allow-net ${OUTPUT_JS} --output ${OUTPUT_EXE}`,
    (error, stdout, stderr) => {
      if (error) return console.error(`[build] Deno compile error: ${error.message}`);
      if (stderr) console.error(`[build] Deno compile stderr: ${stderr}`);
      console.log(`[build] Deno compile stdout: ${stdout}`);
      
      if (fs.existsSync(TEMP_EXE)) fs.unlinkSync(TEMP_EXE);
      const LOCK_FILE = path.join(DIST_DIR, "deno.lock");
      if (fs.existsSync(LOCK_FILE)) fs.unlinkSync(LOCK_FILE);
      if(fs.existsSync('./dist/xdg-open')) fs.unlinkSync('./dist/xdg-open');
      if(fs.existsSync('./dist/appIcon.png')) fs.unlinkSync('./dist/appIcon.png');

      console.log(`[build] Build completo: ${OUTPUT_EXE}`);
    }
  );
}
