const handler = async (m, { conn }) => {
  try {
    // ✅ روابط ثابتة من عندك
    const imageURL = 'https://files.catbox.moe/14jkb5.jpg'
    const audioURL = 'https://files.catbox.moe/y2wobv.mp3'

    // ✅ رسالة الدعم
    const text = `
*👋🏻 اهلا ${m.pushName || ''}*
*مرحبا, انا مطور بوت مافيا*

📞 *رقم المطور:* 
https://wa.me/+201208076133

📞 *رقم مساعد المطور:* 
https://wa.me/+201143061446

📢 *قناة التحديثات:* 
https://whatsapp.com/channel/0029VbAlBNo0LKZFzWoFuT2n

👥 *مجموعة الدعم:* 
https://chat.whatsapp.com/EvzH2hgANS51XjmQ5CBRWc
`.trim()

    // ✅ أرسل الصوت مباشرة من الرابط الخارجي
    await conn.sendMessage(m.chat, {
      audio: { url: audioURL },
      mimetype: 'audio/mpeg',
      ptt: true
    }, { quoted: m })

    // ✅ أرسل الصورة مع الرسالة
    await conn.sendMessage(m.chat, {
      image: { url: imageURL },
      caption: text
    }, { quoted: m })

  } catch (err) {
    console.log(err)
    await m.reply('❌ حدث خطأ! تأكد من الرابط أو من اتصالك بالإنترنت.')
  }
}

handler.command = /^الدعم$/i
export default handler