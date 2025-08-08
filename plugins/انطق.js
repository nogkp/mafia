let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("*اكتب النص الذي تريدني أن أنطقه 🌿*")

  try {
    let url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ar&client=tw-ob`
    
    await conn.sendMessage(m.chat, {
      audio: { url },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m })
  } catch (e) {
    console.error(e)
    return m.reply("❌ حدث خطأ أثناء تحويل النص إلى صوت.")
  }
}

handler.command = ["انطق"]
handler.help = ["انطق (كلمة)"]
handler.tags = ["tools"]
export default handler