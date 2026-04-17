import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// SVG matching icon.tsx — black square, "MS" in white
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0A0A0A"/>
  <text
    x="16" y="22"
    text-anchor="middle"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="700"
    font-size="14"
    letter-spacing="-0.5"
    fill="#F2F2F0"
  >MS</text>
</svg>`

async function generate() {
  const sizes = [16, 32, 48]

  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(Buffer.from(svg))
        .resize(size, size)
        .png()
        .toBuffer()
    )
  )

  // ICO format: ICONDIR + ICONDIRENTRYs + image data
  const headerSize = 6
  const entrySize = 16
  const dirSize = headerSize + entrySize * sizes.length

  // Calculate offsets
  let offset = dirSize
  const offsets = pngBuffers.map((buf) => {
    const o = offset
    offset += buf.length
    return o
  })

  const totalSize = offset
  const ico = Buffer.alloc(totalSize)

  // ICONDIR header
  ico.writeUInt16LE(0, 0)       // reserved
  ico.writeUInt16LE(1, 2)       // type: 1 = ICO
  ico.writeUInt16LE(sizes.length, 4)

  // ICONDIRENTRY for each size
  sizes.forEach((size, i) => {
    const base = headerSize + i * entrySize
    ico.writeUInt8(size === 256 ? 0 : size, base)      // width (0 = 256)
    ico.writeUInt8(size === 256 ? 0 : size, base + 1)  // height
    ico.writeUInt8(0, base + 2)   // color count
    ico.writeUInt8(0, base + 3)   // reserved
    ico.writeUInt16LE(1, base + 4) // color planes
    ico.writeUInt16LE(32, base + 6) // bits per pixel
    ico.writeUInt32LE(pngBuffers[i].length, base + 8)
    ico.writeUInt32LE(offsets[i], base + 12)
  })

  // Write PNG data
  pngBuffers.forEach((buf, i) => {
    buf.copy(ico, offsets[i])
  })

  const outPath = resolve(__dirname, '../src/app/favicon.ico')
  writeFileSync(outPath, ico)
  console.log(`favicon.ico written (${sizes.join('/')}px, ${totalSize} bytes)`)
}

generate().catch((err) => { console.error(err); process.exit(1) })
