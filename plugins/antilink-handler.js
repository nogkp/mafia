
const warns = {} // تخزين مؤقت للإنذارات

const handler = {}

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return
  if (!isBotAdmin) return
  if (!m.text) return
  if (!global.db.data.chats[m.chat]?.antiLink) return // ✅ التفعيل الشرطي

  const linkRegex = /(https?:\/\/|www\.|chat\.whatsapp\.com\/)/i

  if (linkRegex.test(m.text)) {
    const userId = m.sender
    const chatId = m.chat
    const delet = m.key.participant
    const bang = m.key.id
    const userTag = `@${userId.split('@')[0]}`

    if (isAdmin) {
      return await conn.sendMessage(chatId, {
        text: '*[ ☠️ ] مضاد روابط مفعل ~مافيا-بوت_~ ، قول الحمد الله انك ادمن ~مافيا-بوت_~ [ ☠️ ]*',
        mentions: [userId]
      }, { quoted: m })
    }

    try {
      // حذف الرسالة
      await conn.sendMessage(chatId, {
        delete: {
          remoteJid: chatId,
          fromMe: false,
          id: bang,
          participant: delet
        }
      })

      warns[chatId] = warns[chatId] || {}
      warns[chatId][userId] = (warns[chatId][userId] || 0) + 1
      const warningCount = warns[chatId][userId]

      if (warningCount >= 3) {
        await conn.sendMessage(chatId, {
          text: `🚫 ${userTag} تم طردك بعد 3 إنذارات بسبب إرسال روابط.`,
          mentions: [userId]
        }, { quoted: m })

        await conn.groupParticipantsUpdate(chatId, [userId], 'remove')
        warns[chatId][userId] = 0
      } else {
        await conn.sendMessage(chatId, {
          text: `*「 *⟨‼️╎مـضـاد الـروابـط╎‼️⟩* 」*

⚠️ إنذار (${warningCount}/3)
${userTag} لقد أرسلت رابطًا ممنوعًا.
🚫 سيتم طردك عند التكرار حسب قوانين المجموعة.`,
          mentions: [userId]
        }, { quoted: m })
      }
    } catch (err) {
      console.error('❌ خطأ في نظام الإنذارات:', err)
    }
  }
}

export default handler
