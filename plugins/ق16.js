let handler = async (m, { conn }) => {
  let taguser = '@' + m.sender.split("@")[0];

  let message = `
*┃ 🍥┊❝ مـــرحبــــاً بـــكـ/ﻲ يـا ❪${taguser}❫ فـي القسم ❞┊🍥┃*  
   *┃ 🍭┊❝ 𝐌𝐀𝐅𝐈𝐀 ❞┊🍭┃*  
*┃ 🍡┊❝ قـسـم الايـديـت ❞┊🍡┃*  
*┃ 🎀┊❝ القسـم يحتوي على أوامر الفديوهات بكل انوعها ❞┊🎀┃*
*╰───⊰ 🍡❀⊱───╮*  
*✦ ━━━━━ ❀🌸❀ ━━━━━ ✦*  
🍡 *إليك قائمة الأوامر:* 🍡  
*✦ ━━━━━ ❀🌸❀ ━━━━━ ✦*  
*╭──⊰ 🍬 قائمة أوامر الفديوهاا 🍬 ⊱──╮*  
🍡 ⩺ ⌟ايـديـت⌜ 
🍡 ⩺ ⌟دراغـون-بـول⌜ 
🍡 ⩺ ⌟اديـت_كـوره⌜  
🍡 ⩺ ⌟ايـديـت-مـخـتلـط⌜
🍡 ⩺ ⌟ايـديـت-مـنوع⌜ 
🍡 ⩺ ⌟animestory⌜  
🍡 ⩺ ⌟مـيسي⌜ 
🍡 ⩺ ⌟الـدون⌜ 
🍡 ⩺ ⌟ايـديـت-انـمـي⌜
🍡 ⩺ ⌟ايـديـت1⌜
🍡 ⩺ ⌟ايـديـت2⌜
🍡 ⩺ ⌟ايـديـت3⌜
🍡 ⩺ ⌟ايـديـت4⌜ 
*╰──⊰ 🍬 ⊱──╯*  
*╭━─━─━─❀🌸❀─━─━─━╮*  
*┃ 🍬┊ البوت: 𝑴𝑨𝑭𝑰𝑨 ┊🍬┃*  
*┃ 🍭┊ توقيع: 𝑨𝑯𝑴𝑨𝑫 ┊🍭┃*  
*╰━─━─━─❀🌸❀─━─━─━╯*`;

  try {
    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

    await conn.sendMessage(m.chat, { 
      image: { url: 'https://files.catbox.moe/ik8w8t.jpg' },
      caption: message,
      mentions: [m.sender]
    });
  } catch (error) {
    console.error("Error sending message:", error);
    await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء إرسال الصورة.' });
  }
};

handler.command = /^(ق16)$/i;
handler.exp = 50;
handler.fail = null;

export default handler;