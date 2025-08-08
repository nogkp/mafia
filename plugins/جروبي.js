let handler = async (m, { conn, participants, groupMetadata }) => {
  try {
    // احضر صورة القروب من واتساب، لو ما فيه صورة ياخذ صورة محلية
    let pp
    try {
      pp = await conn.profilePictureUrl(m.chat, 'image')
    } catch (e) {
      pp = './media/avatar.jpg' // صورة محلية احتياطية
    }

    // معلومات الجروب
    const { welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antibadword, autosticker } = global.db.data.chats[m.chat]

    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.length > 0
      ? groupAdmins.map((v, i) => `✨ ${i + 1}. @${v.id.split('@')[0]}`).join('\n')
      : 'لا يوجد مشرفين حاليا'

    const owner = groupMetadata.owner || groupAdmins[0]?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

    // نص المعلومات
    let text = `
*╔⏤⏤🌸🌷🌸⏤⏤╗*
『✨💖 معلومات القروب 💖✨』
*╚⏤⏤🌸🌷🌸⏤⏤╝*

🩷 *آيـدي الـقـروب:* ${m.chat}
💜 *إســم الـقـروب:* ${groupMetadata.subject}
💙 *عــدد الأعـضـاء:* ${participants.length}
💖 *مـالـك الـقـروب:* @${owner.split('@')[0]}

*✿ ──⊰ 🌸 ⊱── ✿*
🎀 *الــمــشــرفــيــن:*
${listAdmin}

*✿ ──⊰ 🌸 ⊱── ✿*
💎 *إعـدادات الـقـروب:*
💌 *الترحيب:* ${welcome ? '✅' : '❌'}
🕵🏻‍♀ *الكشف:* ${detect ? '✅' : '❌'}
💢 *مضاد الشتائم:* ${antibadword ? '✅' : '❌'}
🖇️ *مضاد الروابط:* ${antiLink ? '✅' : '❌'}
✨ *الملصقات التلقائية:* ${autosticker ? '✅' : '❌'}

*✿ ──⊰ 🌸 ⊱── ✿*
📩 *إعدادات الرسائل:*
💌 *رسالة الترحيب:* ${sWelcome || 'غير محددة'}
👋 *رسالة الوداع:* ${sBye || 'غير محددة'}
🌸 *رسالة الترقية:* ${sPromote || 'غير محددة'}
🍂 *رسالة التخفيض:* ${sDemote || 'غير محددة'}

*✿ ──⊰ 🌸 ⊱── ✿*
📜 *وصــف الـقـروب:*
${groupMetadata.desc?.toString() || '🤍 غير متوفر 🤍'}
`.trim()

    // أرسل الرسالة مع صورة الجروب أو الصورة الاحتياطية
    await conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: text,
        mentions: [...groupAdmins.map(v => v.id), owner]
      },
      { quoted: m }
    )

  } catch (err) {
    console.error(err)
    m.reply('حدث خطأ أثناء جلب معلومات القروب.')
  }
}

handler.help = ['infogp']
handler.tags = ['group']
handler.command = ['قروبي', 'infogroup', 'groupinfo', 'infogp', 'جروبي']
handler.group = true
handler.admin = true

export default handler