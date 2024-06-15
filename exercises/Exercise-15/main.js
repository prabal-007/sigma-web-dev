import fs from "fs/promises"
import fsn from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const dir = path.dirname(__filename)

const files = await fs.readdir(dir)

files.forEach(file => {
    let folder = path.extname(file).split('.')[1]
    if (folder !== 'js' && folder !== 'json' && folder !== undefined) {
        if (!fsn.existsSync(folder)){
            console.log(folder)
            fs.mkdir(folder)
        }
        fsn.rename(file, `${folder}\\${file}`, (err) => {
            if (err) throw err;
            console.log(`File renamed to ${folder}\\${file}`)
        })
    }
});