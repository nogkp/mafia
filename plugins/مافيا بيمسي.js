let handler = async (m, { conn }) => {
  let videoUrl = 'https://files.catbox.moe/i9k2al.mp4'; // 🔁 رابط الفيديو المباشر

  // 1. إرسال الفيديو أولاً
  await conn.sendMessage(m.chat, {
    video: { url: videoUrl },
    mimetype: 'video/mp4',
    caption: '🎬 *مافيا بيحبك ⚡♥️*\n\n🔥  متخفش يسطا بوتي بيحب الغلبةة👀⚡\n\nشوف الفديو م سكس متخفش😁🌹'
  }, { quoted: m });

  // 2. إرسال رسالة نصية بعدها تحتوي على الأزرار
  await conn.sendMessage(m.chat, {
    text: '*خد يحب الاوامر*👀⚡',
    buttons: [
      { buttonId: '.الاوامر', buttonText: { displayText: 'خد الاوامر يحب 👀⚡' }, type: 1 },
      { buttonId: '.مطور', buttonText: { displayText: '👨‍💻 المطور' }, type: 1 }
    ],
    headerType: 1
  }, { quoted: m });
};

handler.customPrefix = /^مافيا$/i;
handler.command = new RegExp;
export default handler;