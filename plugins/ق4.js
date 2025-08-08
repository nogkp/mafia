let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let name = conn.getName(m.sender) || 'مستخدم';
  let taguser = '@' + m.sender.split("@")[0];

  let currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;
  let groupName = groupMetadata ? groupMetadata.subject : 'غير معروف';
  let groupMembers = groupMetadata ? groupMetadata.participants.length : 'غير معروف';

  let message = `
*┃ 🍥┊❝ مـــرحبــــاً بـــكـ/ﻲ يـا ❪${taguser}❫ في قسم الادوات┊🍥┃*  
   *┃ 🍭┊❝ 𝐌𝐀𝐅𝐈𝐀 ❞┊🍭┃*  
*┃ 🍡┊❝ قسم الادوات ❞┊🍡┃*  
*┃ 🎀┊❝ القسـم يـقدم لك أوامر تخص الادوات ❞┊🎀┃*
*╰───⊰ 🍡❀⊱───╮*  
*✦ ━━━━━ ❀🌸❀ ━━━━━ ✦*  
🍡 *القسم يقدم لك أوامر لي الادوات!* 🍡  
*✦ ━━━━━ ❀🌸❀ ━━━━━ ✦*  
*╭──⊰ 🍬 قائمة الادوات 🍬 ⊱──╮* 
🍡 ⩺ ⌟لـرابـط⌜  
🍡 ⩺ ⌟لـصـوت⌜  
🍡 ⩺ ⌟لـفـيـديـو⌜  
🍡 ⩺ ⌟لـصـوره⌜  
🍡 ⩺ ⌟لـسـتـيـكـر⌜ 
🍡 ⩺ ⌟لـجـيف⌜ 
🍡 ⩺ ⌟تـحـسـيـن⌜  
🍡 ⩺ ⌟تـعـديـل⌜
🍡 ⩺ ⌟تصـميـم⌜ 
🍡 ⩺ ⌟كـود⌜  
🍡 ⩺ ⌟حـقـوق⌜    
🍡 ⩺ ⌟اخـتـصـار⌜    
🍡 ⩺ ⌟تـرجـم⌜    
🍡 ⩺ ⌟رسـم⌜
🍡 ⩺ ⌟كلمات_فيديو⌜
🍡 ⩺ ⌟لـكـرتـون⌜    
🍡 ⩺ ⌟حـلـل⌜    
🍡 ⩺ ⌟صـورتـه⌜ 
🍡 ⩺ ⌟اكـتـشـف⌜ 
🍡 ⩺ ⌟رابـطـي⌜
🍡 ⩺ ⌟دوامة⌜
🍡 ⩺ ⌟فـلـسـطـيـن⌜
🍡 ⩺ ⌟نـص_فـيـديـو⌜
🍡 ⩺ ⌟هـاب_لـوجـو⌜
🍡 ⩺ ⌟جـوده⌜ 
*╰──⊰ 🍬 ⊱──╯*  
*╭━─━─━─❀🌸❀─━─━─━╮*  
*┃ 🍬┊ البوت: 𝑴𝑨𝑭𝑰𝑨 ┊🍬┃*  
*┃ 🍭┊ توقيع: 𝑨𝑯𝑴𝑨𝑫 ┊🍭┃*  
*╰━─━─━─❀🌸❀─━─━─━╯*`;

  const emojiReaction = '🔧';

  try {
    await conn.sendMessage(m.chat, { react: { text: emojiReaction, key: m.key } });4

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

handler.command = /^(ق4)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;