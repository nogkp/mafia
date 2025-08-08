import { videoToSticker } from './path/to/videoToSticker.js' // الكود اللي فوق
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

async function handler(m, conn) {
  if (!m.videoMessage) return m.reply('❌ من فضلك أرسل فيديو!')

  try {
    // تحميل الفيديو من الرسالة
    const stream = await downloadContentFromMessage(m.message.videoMessage, 'video')
    const chunks = []
    for await (const chunk of stream) chunks.push(chunk)
    const buffer = Buffer.concat(chunks)

    // تحويل الفيديو إلى ملصق
    const sticker = await videoToSticker(buffer)

    // إرسال الملصق
    await conn.sendMessage(m.chat, {
      sticker: sticker
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ فشل في تحويل الفيديو إلى ملصق متحرك')
  }
}

handler.command = ['لملصق']
handler.mime = 'video'

export default handler