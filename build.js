import { exec,execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

const DIST_DIR = './dist'
const ENTRY_FILE = './src/index.ts'
const PLUGIN_NAME = 'animeav1'
exec(
  `pnpm exec ncc build ${ENTRY_FILE} -o ${DIST_DIR} -m -C`,
  (error, stdout, stderr) => {
    if (error) {
      return console.error(`[build] NCC build error: ${error.message}`)
    }
    if (stderr) {
      console.error(`[build] NCC stderr: ${stderr}`)
    }
    console.log(`[build] NCC stdout: ${stdout}`)

    const indexJsPath = path.join(DIST_DIR, 'index.js')
    try {
      let value = fs.readFileSync(indexJsPath, { encoding: 'utf-8' })
      value = value.replaceAll('__dirname', 'import.meta.url')
      fs.writeFileSync(indexJsPath, value)
      fs.renameSync(
        path.join(DIST_DIR, `index.js`),
        path.join(DIST_DIR, `${pkg.name}.js`),
      )
      fs.unlinkSync(path.join(DIST_DIR, `xdg-open`))
      fs.unlinkSync(path.join(DIST_DIR, `appIcon.png`))
      execSync(
        `deno compile --allow-read --allow-write --allow-run --allow-env --allow-sys --allow-net ${pkg.name}.js --output ${pkg.name}.exe --no-check`,
        { cwd: DIST_DIR },
      )
      console.log(`[build] Compiled ${pkg.name}.exe`)
      fs.renameSync(
        path.join(DIST_DIR, `${pkg.name}.exe`),
        path.join(DIST_DIR, `${PLUGIN_NAME}.exe`),
      )
      fs.unlinkSync(path.join(DIST_DIR, `${pkg.name}.js`))
      fs.rm(path.join(DIST_DIR, 'client-dist'), {
        recursive: true,
        force: true,
      })
    } catch (err) {
      return console.error(
        `[build] Error post-processing index.js: ${err.message}`,
      )
    }
  },
)
