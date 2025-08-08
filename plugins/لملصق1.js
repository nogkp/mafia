import { Sticker } from 'wa-sticker-formatter'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!/image/.test(mime)) return m.reply('*يسطا انت احول ابعت ينجم صوره وريب عليها😁⚡*')

  let media = await q.download()
  if (!media) return m.reply('⚠️ فشل في تحميل الصورة.')

  try {
    const sticker = new Sticker(media, {
      pack: ' 𝑻𝑯𝒆',
      author: '𓆩𝐌𝐀𝐅𝐈𝐀-𝐁𝐎𝐓𓆪',
    })

    const buffer = await sticker.toBuffer()
    await conn.sendMessage(m.chat, { sticker: buffer }, { quoted: m })
  } catch (e) {
    console.error(e)
    return m.reply('❌ فشل في تحويل الصورة إلى ملصق.')
  }
}

handler.command = ['ستيك']
handler.help = ['استيكر صورة (رد على صورة)']
handler.tags = ['sticker']
export default handler