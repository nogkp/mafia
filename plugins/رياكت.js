let handler = async (m, { conn, usedPrefix: _p, args, text, usedPrefix }) => {
    if (!m.quoted) return m.reply('*ريـب ع الـرسـالـة الـي عـايـزنـي اتـفـاعـل عـلـيـهـا بـالـريـاكـت الـي يـعـجـبـك🐦*')
    if (text.length > 2) return m.reply('*اسـتـخـدم ايـمـوجـي واحـد بـس ي مـعـاق 🦆*')
    if (!text) return m.reply(`*◐  ${usedPrefix}رياكت 🍨*`)
    conn.relayMessage(m.chat, { reactionMessage: { key: { id: m.quoted.id, remoteJid: m.chat, fromMe: true }, text: `${text}` }}, {messageId: m.id })
}
handler.help = ['react']
handler.tags = ['tools']
handler.command = /^(رياكت)$/i

export default handler