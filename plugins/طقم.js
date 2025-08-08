import fetch from "node-fetch"
import * as fs from "fs"
import * as path from "path"

let handler = async (m, { conn }) => {
  // تأكد أن مجلد tmp موجود
  const tmpDir = path.join(process.cwd(), 'tmp')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)

  // تحميل بيانات التطقيم
  let data = await (await fetch('https://raw.githubusercontent.com/KazukoGans/database/main/anime/ppcouple.json')).json()
  let cita = data[Math.floor(Math.random() * data.length)]

  // تحميل صورة الولد
  let cowi = await (await fetch(cita.cowo)).buffer()
  await conn.sendFile(m.chat, cowi, '', '♂️ ولد', m)

  // تحميل صورة البنت
  let ciwi = await (await fetch(cita.cewe)).buffer()
  await conn.sendFile(m.chat, ciwi, '', '♀️ بنت', m)
}

handler.help = ['ppcouple', 'ppcp']
handler.tags = ['internet']
handler.command = ['تطقيم', 'كابلز']

export default handler