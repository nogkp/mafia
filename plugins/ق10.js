let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender) || 'مستخدم';
  let taguser = '@' + m.sender.split("@")[0];

  let currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
  let groupName = groupMetadata ? groupMetadata.subject : 'غير معروف';
  let groupMembers = groupMetadata ? groupMetadata.participants.length : 'غير معروف';

  let message = `
*┃ 🍥┊❝ مـــرحبــــاً بـــكـ/ﻲ يـا ❪${taguser}❫ في قسم الزخارف ❞┊🍥┃*  
   *┃ 🍭┊❝ 𝐌𝐀𝐅𝐈𝐀 ❞┊🍭┃*  
*┃ 🍡┊❝ قسم الزخارف ❞┊🍡┃*  
*┃ 🎀┊❝ القسـم يـقدم لك أوامر تخص الزخارف ❞┊🎀┃*
*╰───⊰ 🍡❀⊱───╮*  
*✦ ━━━━━ ❀🌸❀ ━━━━━ ✦*  
🍡القسم يقدم لك أوامر المتعلقه بي الزخارف🍡  
*✦ ━━━━━ ❀🌸❀ ━━━━━ ✦*  
*╭──⊰ 🍬 قائمة الزخارف 🍬 ⊱──╮*  
🍡 ⩺ ⌟زخــرف1⌜
🍡 ⩺ ⌟زخــرف2⌜
🍡 ⩺ ⌟زخــرف3⌜  
🍡 ⩺ ⌟زخــرف4⌜  
🍡 ⩺ ⌟زخــرف5⌜  
🍡 ⩺ ⌟زخــرف6⌜ 
🍡 ⩺ ⌟زخــرف7⌜
🍡 ⩺ ⌟زخــرف8⌜
🍡 ⩺ ⌟زخــرف9⌜
🍡 ⩺ ⌟زخــرف10⌜
🍡 ⩺ ⌟زخــرف11⌜
*╰──⊰ 🍬 ⊱──╯*  
*✦ ━━━━━ ❀🌸❀ ━━━━━ ✦*  
🍡 *┊ مـلاحظـة 🍡 : القسم تحت التطوير!*  
*╭━─━─━─❀🌸❀─━─━─━╮*  
*┃ 🍬┊ البوت: 𝑴𝑨𝑭𝑰𝑨 ┊🍬┃*  
*┃ 🍭┊ توقيع: 𝑨𝑯𝑴𝑨𝑫 ┊🍭┃*  
*╰━─━─━─❀🌸❀─━─━─━╯*`;

  const emojiReaction = '📜';

  try {
    await conn.sendMessage(m.chat, { react: { text: emojiReaction, key: m.key } });

    await conn.sendMessage(m.chat, { 
      image: { url: 'https://files.catbox.moe/ggrqua.jpg' },
      caption: message,
      mentions: [m.sender]
    });
  } catch (error) {
    console.error("Error sending message:", error);
    await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء إرسال الصورة.' });
  }
};

handler.command = /^(ق11)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;