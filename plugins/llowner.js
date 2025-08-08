let handler = async (m, { conn, text }) => {

  if (!text) {
    return m.reply('*`〘 💬 〙 ادخل الرسالة التي تود إرسالها إلى مطوري.`*');
  }

  let who;
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  } else {
    who = m.sender;
  }

  let teks = `
  *〘 رسالة من المستخدمين 〙*
  
  المرسل: @${who.split`@`[0]}
  
  الرسالة: ${text}
  `.trim();

  const me = '201208076133@s.whatsapp.net';
  let url;

  try {
    url = await conn.profilePictureUrl(who, 'image');
  } catch {
    url = 'https://tinyurl.com/242s6bl4';
  }

  await conn.sendFile(me, url, 'user.png', teks, m, null, { mentions: [who] });

  m.reply(`*تم إرسال رسالتك إلى مطوري*\n> انتظر الرد من مطوري يا صديقي...`);
};

handler.help = ['massage'];
handler.tags = ['infobot'];
handler.command = /^(للمطور)$/i;

export default handler;