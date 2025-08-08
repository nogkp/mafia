let handler = async (m, { conn }) => {
  let taguser = '@' + m.sender.split("@")[0];  // إضافة اسم المستخدم بشكل معرّف

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : null;  // جلب بيانات المجموعة
  let groupName = groupMetadata ? groupMetadata.subject : 'غير متاح';  // جلب اسم الجروب

  let message = `
*┃ 🍥┊❝ مـــرحبــــاً بـــكـ/ﻲ يـا ❪${taguser}❫ ❞┊🍥┃*
*┃ 🏷┊❝ اسـم الـروم: ${groupName} ❞┊
*┃ 🍭┊❝ MAFIA ❞┊🍭┃*
*┃ 🍡┊❝ قـسـم الـمعـلومـات ❞┊🍡┃*
*┃ 🎀┊❝ يقدم لكـ  اوامر تخص رد البوت ودعم البوت ❞┊🎀┃*
*╰───⊰ 🍡❀⊱───╮*
🍡 ⩺ ⌟مـافـيـا⌜  
🍡 ⩺ ⌟بـوت⌜  
🍡 ⩺ ⌟بـوت2⌜ 
🍡 ⩺ ⌟.بـوت⌜ 
🍡 ⩺ ⌟مافيا-بيحبك⌜  
🍡 ⩺ ⌟الـلـغـه⌜  
🍡 ⩺ ⌟التوقيت⌜  
🍡 ⩺ ⌟الـوقت⌜  
🍡 ⩺ ⌟الطقـس⌜  
🍡 ⩺ ⌟الدعـم⌜  
🍡 ⩺ ⌟الأوامر⌜  
🍡 ⩺ ⌟الـمـطـور⌜  
🍡 ⩺ ⌟بـنـج⌜  
🍡 ⩺ ⌟ليمت⌜  
🍡 ⩺ ⌟الـمـعـرف⌜  
🍡 ⩺ ⌟تـست⌜
🍡 ⩺ ⌟حـياه⌜ 
*╭━─━─━─❀🌸❀─━─━─━╮*
*┃ 🍬┊ البوت: 𝑴𝑨𝑭𝑰𝑨 ┊🍬┃*
*┃ 🍭┊ توقيع: 𝑨𝑯𝑴𝑨𝑫 ┊🍭┃*
*╰━─━─━─❀🌸❀─━─━─━╯*
`;

  try {
    // رد فعل على الرسالة
    await conn.sendMessage(m.chat, { react: { text: '🌹', key: m.key } });

    // إرسال الصورة مع الرسالة
    await conn.sendMessage(m.chat, {
      image: { url: 'https://files.catbox.moe/zzscpq.jpg' },  // الرابط للصورة
      caption: message
    });
  } catch (error) {
    console.error("❌ حدث خطأ:", error);
    await conn.sendMessage(m.chat, { text: 'حدث خطأ أثناء إرسال الترحيب.' });
  }
};

handler.command = /^(ق20)$/i;  // الأمر الخاص بالقسم
handler.exp = 50;
handler.fail = null;

export default handler;