let handler = async (m, { conn }) => {
  let taguser = '@' + m.sender.split("@")[0];

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
  let groupName = groupMetadata ? groupMetadata.subject : 'غير متاح';
  let groupMembers = groupMetadata ? groupMetadata.participants.length : 'غير متاح';

  let message = `
*┃ 🍥┊❝ مــرحبــــاً بــكـ/ﻲ يـا ❪${taguser}❫ ❞┊🍥┃*
*┃ 🏷┊❝ اسـم الـروم: ${groupName} ❞┊🏷┃*
*┃ 👥┊❝ الأعـضـاء: ${groupMembers} ❞┊👥┃*
*┃ 🍭┊❝ MAFIA ❞┊🍭┃*
*┃ 🍡┊❝ قـسـم الأعضـاء ❞┊🍡┃*
*┃ 🎀┊❝ يقدم لكـ الخيارات التالية ❞┊🎀┃*
*╰───⊰ 🍡❀⊱───╮*
🍡 ⩺ ⌟ابـلاغ⌜  
🍡 ⩺ ⌟لـلـمـطـور⌜  
🍡 ⩺ ⌟الـتـفـعـيـل⌜  
🍡 ⩺ ⌟تـعـريـفـي⌜  
🍡 ⩺ ⌟تـسـجـيـل⌜  
🍡 ⩺ ⌟حـذف-الـتـسـجـيـل⌜  
🍡 ⩺ ⌟بـروفـايـلـي⌜  
🍡 ⩺ ⌟لـيـنـكـي⌜  
🍡 ⩺ ⌟اصـلـح⌜  
🍡 ⩺ ⌟تـصـلـيـح⌜  
🍡 ⩺ ⌟تـقـيـيـم⌜  
🍡 ⩺ ⌟الـشـخـصـيـه⌜  
*╭━─━─━─❀🌸❀─━─━─━╮*
*┃ 🍬┊ البوت: MAFIA ┊🍬┃*
*┃ 🍭┊ توقيع: AHMAD ┊🍭┃*
*╰━─━─━─❀🌸❀─━─━─━╯*
`;

  try {
    await conn.sendMessage(m.chat, { react: { text: '💞', key: m.key } });

    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/zzscpq.jpg' },
      caption: message,
      mentions: [m.sender]
    });
  } catch (error) {
    console.error("Error sending message:", error);
    await conn.sendMessage(m.chat, { text: '❌ حدث خطأ أثناء إرسال القسم.' });
  }
};

handler.command = /^(ق18)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;