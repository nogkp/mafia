let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let kickte = `*مـنـشـن انـت بـس ي كـبـيـر 😹*`
    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)}) 
    
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let owner = '201208076133@s.whatsapp.net'
    let botNumber = conn.user.jid

    if (user === botNumber) return m.reply('`بـالـمـنـطـق يـعـنـي هـطـرد نـفـسـي ازاي` 🐦')
    if (user === owner) {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        return m.reply('`بـتـحـاول تـطـرد مـطـوري, طـب خـد` 😙🤙🏼')
    }
    if (user === m.sender) return m.reply('`بـتـهـزر انـت بـتـطـرد نـفـسـك` 😹')

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    m.reply(`*╭────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╮*\n*︱تـم سـاويـتـو بـالاسـفـلـت 💋*\n*╭────┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄────╮*`) 
}

handler.help = ['انطر @user']
handler.tags = ['الجروب']
handler.command = ['كسمو', 'طرد', 'انطر', 'انطرو']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler