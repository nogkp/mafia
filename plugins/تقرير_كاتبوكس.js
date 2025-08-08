import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const basePath = path.join(__dirname, '../plugins')
const targetNumber = '201208076133@s.whatsapp.net'

let handler = async (m, { conn }) => {
  const files = fs.readdirSync(basePath).filter(f => f.endsWith('.js'))

  for (let file of files) {
    const filePath = path.join(basePath, file)
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const matches = [...content.matchAll(/https:\/\/files\.catbox\.moe\S+/g)]

      matches.forEach((match, index) => {
        const partNumber = index + 1
        const message = `💀 *تم العثور على رابط من نوع catbox في ملف:*
📁 الملف: ${file}
🔢 الجزء: ${partNumber}
🔗 الرابط: ${match[0]}`

        conn.sendMessage(targetNumber, { text: message })
      })
    } catch (err) {
      console.error(`خطأ في الملف ${file}: ${err.message}`)
    }
  }
}

handler.command = /^تقرير_كاتبوكس$/i
handler.tags = ['owner']
handler.owner = true
handler.help = ['تقرير_كاتبوكس']

export default handler