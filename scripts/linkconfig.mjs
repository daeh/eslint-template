import { promises as fs } from 'fs'
import { platform } from 'os'
import { join } from 'path'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

async function createLink() {
  // const packageRoot = process.env.INIT_CWD
  const projectDirname = resolve(dirname(dirname(fileURLToPath(import.meta.url))))

  const sourceFile = join(projectDirname, 'eslint.config.mjs')
  const targetFile = join(projectDirname, 'eslint.config.js')

  console.log(`linking ${sourceFile} to ${targetFile}`)

  try {
    if (platform() === 'win32') {
      // On Windows, create a symbolic link
      await fs.symlink(sourceFile, targetFile, 'file')
      console.log('Symbolic link created successfully.')
    } else {
      // On Unix-like systems, create a hard link
      await fs.link(sourceFile, targetFile)
      console.log('Hard link created successfully.')
    }
  } catch (err) {
    console.error('Error creating link:', err.message)
  }
}

createLink()
