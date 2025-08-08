import { addExif } from '../lib/sticker.js'
import { webp2png } from '../lib/webp2mp4.js'
import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) throw 'رد عل ملصق يحب😪💗.'

  let mime = m.quoted.mimetype || ''
  if (!/webp|image|video/.test(mime)) throw '❌ نوع الملف غير مدعوم، استخدم صورة، فيديو قصير أو ملصق.'

  let [packname, ...author] = text.split('|')
  author = (author || []).join('|')
  if (!packname) throw '❌ اكتب اسم الباقة والمؤلف مثلا:\n.حقوق 𝑻𝑯𝒆 |𓆩𝐌𝐀𝐅𝐈𝐀-𝐁𝐎𝐓𓆪'

  let img = await m.quoted.download()

  // لو الملصق مش webp نحوله
  if (!/webp/.test(mime)) {
    try {
      let buffer = await webp2png(img) // نحول لأي تنسيق مدعوم
      img = buffer
    } catch (e) {
      throw '❌ فشل في تحويل الملف للملصق.'
    }
  }

  try {
    let stiker = await addExif(img, packname.trim(), author.trim())
    if (stiker) return await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, false, { asSticker: true })
    else throw 'ف حاجه حصلت غريبه ي حب اتاكد من الملصق😪💗.'
  } catch (e) {
    console.error(e)
    throw 'اختار ي حب ملصق وحط حقوقك م صوره😪💗 .'
  }
}

handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^(سرقه|اسرق|حقوق)$/i
export default handler